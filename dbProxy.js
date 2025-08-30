// ====================================================================================
//
//      dbProxy.js - DenyAnimeHub (Versão Definitiva e Robusta com Supabase/Sequelize Proxy)
//
//      Este arquivo atua como uma camada de abstração para o acesso ao banco de dados,
//      permitindo alternar facilmente entre Supabase-JS e Sequelize.
//      Ele minimiza a necessidade de alterar o código de business logic nos controllers.
//
// ====================================================================================

require('dotenv').config(); // Garante que as variáveis de ambiente são carregadas no início
const { supabase, supabaseAdmin, initError: supabaseConnectorInitError } = require('./supabaseConnector');
const dbSequelize = require('./models'); // Seus modelos Sequelize
const { Op, Sequelize } = require('sequelize'); // Importa Op e Sequelize diretamente do Sequelize para acesso ao fn() e col()

// --- 1. CONFIGURAÇÃO SUPABASE / SEQUELIZE ---
// Defina se Supabase deve ser o banco de dados primário.
// Se 'true', tentará usar Supabase. Se 'false' ou se o Supabase não inicializou,
// tentará usar Sequelize (assumindo que dbSequelize.sequelize esteja configurado).
const useSupabase = !supabaseConnectorInitError && !!supabase; // Apenas usa Supabase se o conector inicializou sem erros e o cliente está disponível

if (useSupabase) {
    console.log('⚙️ dbProxy: Usando Supabase como banco de dados principal.');
} else {
    console.warn('⚙️ dbProxy: Supabase indisponível ou configurado para não ser usado. Tentando usar Sequelize como fallback.');
    if (supabaseConnectorInitError) {
        console.warn('   (Motivo: Erro na inicialização do supabaseConnector)');
    } else if (!supabase) {
        console.warn('   (Motivo: Cliente Supabase não foi inicializado)');
    }
    // Adiciona uma verificação se dbSequelize.sequelize está pronto
    if (!dbSequelize || !dbSequelize.sequelize) {
        console.error('❌ dbProxy: Sequelize também não está configurado ou inicializado. O acesso ao banco de dados pode falhar.');
    } else {
        console.log('   (Sequelize está configurado e pronto para uso como fallback)');
    }
}

// --- 2. Função Auxiliar para Incrementar Campos no Supabase ---
async function incrementFieldSupabase(table, field, identifier) {
    if (!supabaseAdmin) {
        throw new Error('Cliente Supabase Admin não disponível para incrementar campo. Verifique SUPABASE_SERVICE_KEY.');
    }

    const { data, error } = await supabaseAdmin
        .from(table)
        .select(field)
        .match(identifier)
        .limit(1);

    if (error) {
        console.error(`Erro ao buscar campo para incremento em ${table}:`, error);
        throw error;
    }
    if (!data || data.length === 0) {
        console.warn(`Nenhum registro encontrado para incrementar em ${table} com identificador:`, identifier);
        return null;
    }

    const novoValor = (data[0][field] || 0) + 1;
    const { error: updateError, data: updatedData } = await supabaseAdmin
        .from(table)
        .update({ [field]: novoValor })
        .match(identifier)
        .select(); // Retorna os dados atualizados

    if (updateError) {
        console.error(`Erro ao incrementar campo '${field}' em ${table}:`, updateError);
        throw updateError;
    }
    return updatedData[0]; // Retorna o objeto completo atualizado
}

// --- 3. Mapeamento de Operadores Sequelize para Supabase ---
function mapWhereClauseToSupabase(query, whereClause) {
    if (!whereClause) return query;

    for (const key in whereClause) {
        const value = whereClause[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Lidar com operadores Sequelize como Op.iLike, Op.gte, etc.
            if (value[Op.iLike]) {
                query = query.ilike(key, value[Op.iLike]);
            } else if (value[Op.eq]) {
                query = query.eq(key, value[Op.eq]);
            } else if (value[Op.ne]) {
                query = query.neq(key, value[Op.ne]);
            } else if (value[Op.gt]) {
                query = query.gt(key, value[Op.gt]);
            } else if (value[Op.gte]) {
                query = query.gte(key, value[Op.gte]);
            } else if (value[Op.lt]) {
                query = query.lt(key, value[Op.lt]);
            } else if (value[Op.lte]) {
                query = query.lte(key, value[Op.lte]);
            } else if (value[Op.in]) {
                query = query.in(key, value[Op.in]);
            } else if (value[Op.notIn]) {
                query = query.not_in(key, value[Op.notIn]);
            } else if (value[Op.or] && Array.isArray(value[Op.or])) {
                // Mapeamento básico para Op.or. Pode precisar de mais refinamento.
                const orConditions = value[Op.or].map(orVal => {
                    if (orVal === null) return `${key}.is.null`;
                    if (typeof orVal === 'boolean') return `${key}.is.${orVal}`;
                    return `${key}.eq.${orVal}`;
                }).join(',');
                query = query.or(orConditions);
            }
            // Adicione mais mapeamentos conforme necessário para seus operadores Sequelize
        } else if (key === 'emDestaque' && (value === null || value === false || (Array.isArray(value) && (value.includes(false) || value.includes(null))))) {
            // Lógica específica para 'emDestaque' que pode ser [false, null]
            if (Array.isArray(value) && value.includes(false) && value.includes(null)) {
                 query = query.or(`emDestaque.is.false,emDestaque.is.null`);
            } else if (value === false) {
                 query = query.eq('emDestaque', false);
            } else if (value === null) {
                 query = query.is('emDestaque', null);
            }
        }
        else {
            query = query.eq(key, value);
        }
    }
    return query;
}

// ====================================================================================
// --- 4. PROXY PARA MODELS
// ====================================================================================
const db = {

    // ------------------- ANIME -------------------
    Anime: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('animes').select('*'); // Usar supabase padrão (anon)
                query = mapWhereClauseToSupabase(query, options.where); // Aplica cláusulas WHERE

                if (options.order && options.order.length > 0) {
                    // Supabase order pode receber múltiplos campos, mas aqui consideramos o primeiro
                    const [field, dir] = options.order[0]; 
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1); // Garante limit não ser 0

                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
            return dbSequelize.Anime.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('animes').select('*');
                if (options.where) {
                    query = mapWhereClauseToSupabase(query, options.where);
                }
                query = query.limit(1);

                const { data, error } = await query;
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.Anime.findOne(options);
        },

        findAndCountAll: async (options = {}) => {
            if (useSupabase) {
                const offset = options.offset || 0;
                const limit = options.limit || 24;
                const order = options.order && options.order.length > 0 ? options.order[0] : ['createdAt', 'desc'];

                let baseQuery = supabase.from('animes').select('*', { count: 'exact' });
                baseQuery = mapWhereClauseToSupabase(baseQuery, options.where);

                const { data, count, error } = await baseQuery
                    .range(offset, offset + limit - 1)
                    .order(order[0], { ascending: order[1].toUpperCase() === 'ASC' });

                if (error) throw error;
                return { rows: data, count };
            }
            return dbSequelize.Anime.findAndCountAll(options);
        },

        increment: async (field, options) => {
            if (useSupabase) {
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para incrementar no Supabase.");
                }
                return incrementFieldSupabase('animes', field, identifier);
            }
            return dbSequelize.Anime.increment(field, options);
        },

        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar anime. Verifique SUPABASE_SERVICE_KEY.');
                const { data, error } = await supabaseAdmin.from('animes').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Anime.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar anime. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
                }
                let query = supabaseAdmin.from('animes').update(values);
                query = mapWhereClauseToSupabase(query, identifier);
                const { data, error } = await query.select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Anime.update(values, options);
        },
        destroy: async (options = {}) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar anime. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('animes').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                // Supabase delete retorna { error } ou null, não um número de linhas afetadas.
                // Simulamos um retorno para compatibilidade.
                return { success: true, affectedRows: 1 }; 
            }
            return dbSequelize.Anime.destroy(options);
        }
    },

    // ------------------- EPISODIO -------------------
    Episodio: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('episodios').select('*');
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order && options.order.length > 0) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
            return dbSequelize.Episodio.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('episodios').select('*');
                query = mapWhereClauseToSupabase(query, options.where);
                query = query.limit(1);

                const { data, error } = await query;
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.Episodio.findOne(options);
        },

        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar episódio. Verifique SUPABASE_SERVICE_KEY.');
                const { data, error } = await supabaseAdmin.from('episodios').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Episodio.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar episódio. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
                }
                let query = supabaseAdmin.from('episodios').update(values);
                query = mapWhereClauseToSupabase(query, identifier);
                const { data, error } = await query.select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Episodio.update(values, options);
        },
        destroy: async (options = {}) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar episódio. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('episodios').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true, affectedRows: 1 };
            }
            return dbSequelize.Episodio.destroy(options);
        }
    },

    // ------------------- POST (Notícias) -------------------
    Post: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('posts').select('*');
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order && options.order.length > 0) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
            return dbSequelize.Post.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('posts').select('*');
                query = mapWhereClauseToSupabase(query, options.where);
                query = query.limit(1);

                const { data, error } = await query;
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.Post.findOne(options);
        },

        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar post. Verifique SUPABASE_SERVICE_KEY.');
                const { data, error } = await supabaseAdmin.from('posts').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Post.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar post. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
                }
                let query = supabaseAdmin.from('posts').update(values);
                query = mapWhereClauseToSupabase(query, identifier);
                const { data, error } = await query.select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Post.update(values, options);
        },
        destroy: async (options = {}) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar post. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('posts').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true, affectedRows: 1 };
            }
            return dbSequelize.Post.destroy(options);
        }
    },

    // ------------------- USER -------------------
    User: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('users').select('*');
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order && options.order.length > 0) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
            return dbSequelize.User.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('users').select('*');
                query = mapWhereClauseToSupabase(query, options.where);
                query = query.limit(1);

                const { data, error } = await query;
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.User.findOne(options);
        },

        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar usuário. Verifique SUPABASE_SERVICE_KEY.');
                const { data, error } = await supabaseAdmin.from('users').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.User.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar usuário. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
                }
                let query = supabaseAdmin.from('users').update(values);
                query = mapWhereClauseToSupabase(query, identifier);
                const { data, error } = await query.select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.User.update(values, options);
        },
        destroy: async (options = {}) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar usuário. Verifique SUPABASE_SERVICE_KEY.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('users').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true, affectedRows: 1 };
            }
            return dbSequelize.User.destroy(options);
        },
        increment: async (field, options) => {
            if (useSupabase) {
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para incrementar no Supabase.");
                }
                return incrementFieldSupabase('users', field, identifier);
            }
            return dbSequelize.User.increment(field, options);
        }
    },

    // ------------------- HISTORICO (Histórico de Visualização) -------------------
    Historico: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('historicos').select('*');
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order && options.order.length > 0) {
                const [field, dir] = options.order[0];
                query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
            }
            if (options.limit) query = query.limit(options.limit);
            if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

            const { data, error } = await query;
            if (error) throw error;
            return data;
        }
        return dbSequelize.Historico.findAll(options);
    },
    findOne: async (options = {}) => {
        if (useSupabase) {
            let query = supabase.from('historicos').select('*');
            query = mapWhereClauseToSupabase(query, options.where);
            query = query.limit(1);

            const { data, error } = await query;
            if (error) throw error;
            return data[0] || null;
        }
        return dbSequelize.Historico.findOne(options);
    },
    findOrCreate: async (options) => {
        if (useSupabase) {
            const { where, defaults } = options;
            let query = supabase.from('historicos').select('*');
            query = mapWhereClauseToSupabase(query, where);
            const { data: foundData, error: findError } = await query.limit(1);

            if (findError) throw findError;

            if (foundData && foundData.length > 0) {
                // Encontrado, então atualiza o 'updatedAt' se necessário, ou retorna
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar histórico em findOrCreate. Verifique SUPABASE_SERVICE_KEY.');
                const { data: updatedData, error: updateError } = await supabaseAdmin.from('historicos')
                    .update({ ...defaults, updatedAt: new Date().toISOString() }) // Força update do updatedAt
                    .match(where)
                    .select();
                if (updateError) throw updateError;
                return [updatedData[0], false]; // Retorna o registro atualizado e 'false' (não foi criado)
            } else {
                // Não encontrado, criar
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar histórico em findOrCreate. Verifique SUPABASE_SERVICE_KEY.');
                const { data: createdData, error: createError } = await supabaseAdmin.from('historicos').insert([{ ...where, ...defaults }]).select();
                if (createError) throw createError;
                return [createdData[0], true]; // Retorna o registro criado e 'true' (foi criado)
            }
        }
        return dbSequelize.Historico.findOrCreate(options);
    },
    create: async (values) => {
        if (useSupabase) {
            if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar histórico. Verifique SUPABASE_SERVICE_KEY.');
            const { data, error } = await supabaseAdmin.from('historicos').insert([values]).select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Historico.create(values);
    },
    update: async (values, options) => {
        if (useSupabase) {
            if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar histórico. Verifique SUPABASE_SERVICE_KEY.');
            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
            }
            let query = supabaseAdmin.from('historicos').update(values);
            query = mapWhereClauseToSupabase(query, identifier);
            const { data, error } = await query.select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Historico.update(values, options);
    },
    destroy: async (options = {}) => {
        if (useSupabase) {
            if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar histórico. Verifique SUPABASE_SERVICE_KEY.');
            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
            }
            let query = supabaseAdmin.from('historicos').delete();
            query = mapWhereClauseToSupabase(query, identifier);
            const { error } = await query;
            if (error) throw error;
            return { success: true, affectedRows: 1 };
        }
        return dbSequelize.Historico.destroy(options);
    }
},

// ------------------- COMENTÁRIO -------------------
Comment: {
    findAll: async (options = {}) => {
        if (useSupabase) {
            let query = supabase.from('comments').select('*');
            query = mapWhereClauseToSupabase(query, options.where);

            if (options.order && options.order.length > 0) {
                const [field, dir] = options.order[0];
                query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
            }
            if (options.limit) query = query.limit(options.limit);
            if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

            const { data, error } = await query;
            if (error) throw error;
            return data;
        }
        return dbSequelize.Comment.findAll(options);
    },
    findOne: async (options = {}) => {
        if (useSupabase) {
            let query = supabase.from('comments').select('*');
            query = mapWhereClauseToSupabase(query, options.where);
            query = query.limit(1);

            const { data, error } = await query;
            if (error) throw error;
            return data[0] || null;
        }
        return dbSequelize.Comment.findOne(options);
    },
    create: async (values) => {
        if (useSupabase) {
            // Comentários podem ser criados pelo usuário logado, usando o cliente Supabase padrão
            // Se RLS estiver configurado para permitir `insert` para o usuário autenticado.
            const client = supabaseAdmin || supabase; // Prefer admin se disponível para flexibilidade
            if (!client) throw new Error('Cliente Supabase não disponível para criar comentário. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');
            const { data, error } = await client.from('comments').insert([values]).select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Comment.create(values);
    },
    update: async (values, options) => {
        if (useSupabase) {
            const client = supabaseAdmin || supabase;
            if (!client) throw new Error('Cliente Supabase não disponível para atualizar comentário. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');

            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
            }
            let query = client.from('comments').update(values);
            query = mapWhereClauseToSupabase(query, identifier);
            const { data, error } = await query.select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Comment.update(values, options);
    },
    destroy: async (options = {}) => {
        if (useSupabase) {
            const client = supabaseAdmin || supabase;
            if (!client) throw new Error('Cliente Supabase não disponível para deletar comentário. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');

            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
            }
            let query = client.from('comments').delete();
            query = mapWhereClauseToSupabase(query, identifier);
            const { error } = await query;
            if (error) throw error;
            return { success: true, affectedRows: 1 };
        }
        return dbSequelize.Comment.destroy(options);
    }
},

// ------------------- RATING -------------------
Rating: {
    findAll: async (options = {}) => {
        if (useSupabase) {
            let query = supabase.from('ratings').select('*');
            query = mapWhereClauseToSupabase(query, options.where);

            if (options.order && options.order.length > 0) {
                const [field, dir] = options.order[0];
                query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
            }
            if (options.limit) query = query.limit(options.limit);
            if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 0) - 1);

            const { data, error } = await query;
            if (error) throw error;
            return data;
        }
        return dbSequelize.Rating.findAll(options);
    },
    findOne: async (options = {}) => {
        if (useSupabase) {
            let query = supabase.from('ratings').select('*');
            query = mapWhereClauseToSupabase(query, options.where);
            query = query.limit(1);

            const { data, error } = await query;
            if (error) throw error;
            return data[0] || null;
        }
        return dbSequelize.Rating.findOne(options);
    },
    findOrCreate: async (options) => {
        if (useSupabase) {
            const { where, defaults } = options;
            let query = supabase.from('ratings').select('*');
            query = mapWhereClauseToSupabase(query, where);
            const { data: foundData, error: findError } = await query.limit(1);

            if (findError) throw findError;

            if (foundData && foundData.length > 0) {
                // Encontrado, então atualiza
                const client = supabaseAdmin || supabase;
                if (!client) throw new Error('Cliente Supabase não disponível para atualizar avaliação em findOrCreate. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');
                const { data: updatedData, error: updateError } = await client.from('ratings')
                    .update(defaults) // Atualiza com os defaults (que contêm a nova nota)
                    .match(where)
                    .select();
                if (updateError) throw updateError;
                return [updatedData[0], false];
            } else {
                // Não encontrado, criar
                const client = supabaseAdmin || supabase;
                if (!client) throw new Error('Cliente Supabase não disponível para criar avaliação em findOrCreate. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');
                const { data: createdData, error: createError } = await client.from('ratings').insert([{ ...where, ...defaults }]).select();
                if (createError) throw createError;
                return [createdData[0], true];
            }
        }
        return dbSequelize.Rating.findOrCreate(options);
    },
    create: async (values) => {
        if (useSupabase) {
            const client = supabaseAdmin || supabase;
            if (!client) throw new Error('Cliente Supabase não disponível para criar avaliação. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');
            const { data, error } = await client.from('ratings').insert([values]).select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Rating.create(values);
    },
    update: async (values, options) => {
        if (useSupabase) {
            const client = supabaseAdmin || supabase;
            if (!client) throw new Error('Cliente Supabase não disponível para atualizar avaliação. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');

            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
            }
            let query = client.from('ratings').update(values);
            query = mapWhereClauseToSupabase(query, identifier);
            const { data, error } = await query.select();
            if (error) throw error;
            return data[0];
        }
        return dbSequelize.Rating.update(values, options);
    },
    destroy: async (options = {}) => {
        if (useSupabase) {
            const client = supabaseAdmin || supabase;
            if (!client) throw new Error('Cliente Supabase não disponível para deletar avaliação. Verifique SUPABASE_URL ou SUPABASE_SERVICE_KEY.');

            const identifier = options.where;
            if (!identifier || Object.keys(identifier).length === 0) {
                throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
            }
            let query = client.from('ratings').delete();
            query = mapWhereClauseToSupabase(query, identifier);
            const { error } = await query;
            if (error) throw error;
            return { success: true, affectedRows: 1 };
        }
        return dbSequelize.Rating.destroy(options);
    },
    // Método para calcular média de rating (exemplo)
    getAverageRating: async (animeId) => {
        if (useSupabase) {
            const { data, error } = await supabase.from('ratings')
                .select('rating') // Alterado de 'nota' para 'rating' conforme seu modelo
                .eq('animeId', animeId);

            if (error) throw error;

            if (!data || data.length === 0) return 0;

            const totalRatings = data.reduce((sum, r) => sum + r.rating, 0); // Alterado de 'nota' para 'rating'
            return totalRatings / data.length;
        }
        // Fallback Sequelize
        const { totalNotas, totalAvaliacoes } = await dbSequelize.Rating.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('rating')), 'totalNotas'], // Alterado de 'nota' para 'rating'
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalAvaliacoes']
            ],
            where: { animeId },
            raw: true // Retorna resultados puros
        });

        if (totalAvaliacoes === 0) return 0;
        return totalNotas / totalAvaliacoes;
    }
},


// Expõe Op e sequelize para uso direto em casos específicos
Op: Op,
sequelize: dbSequelize.sequelize,
useSupabase: useSupabase, // Expõe o estado para que outras partes da aplicação possam verificar
supabaseClient: supabase, // Expõe o cliente Supabase para uso direto, se necessário
supabaseAdminClient: supabaseAdmin // Expõe o cliente Supabase Admin para uso direto, se necessário
};
module.exports = db;