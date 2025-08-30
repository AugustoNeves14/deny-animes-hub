// ====================================================================================
//
//      dbProxy.js - DenyAnimeHub (Versão Definitiva e Robusta com Supabase/Sequelize Proxy)
//
//      Este arquivo atua como uma camada de abstração para o acesso ao banco de dados,
//      permitindo alternar facilmente entre Supabase-JS e Sequelize.
//      Ele minimiza a necessidade de alterar o código de business logic nos controllers.
//
// ====================================================================================

require('dotenv').config();
const { supabase, supabaseAdmin, initError: supabaseConnectorInitError } = require('./supabaseConnector');
const dbSequelize = require('./models'); // Seus modelos Sequelize
const { Op } = require('sequelize'); // Importa Op diretamente do Sequelize

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
}


// --- 2. Função Auxiliar para Incrementar Campos no Supabase ---
async function incrementFieldSupabase(table, field, identifier) {
    // Usamos supabaseAdmin aqui para garantir que podemos incrementar sem restrições de RLS
    // assumindo que esta é uma operação de backend privilegiada.
    if (!supabaseAdmin) {
        throw new Error('Cliente Supabase Admin não disponível para incrementar campo.');
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
        return null; // Retorna null se o registro não for encontrado
    }

    const novoValor = (data[0][field] || 0) + 1;
    const { error: updateError } = await supabaseAdmin
        .from(table)
        .update({ [field]: novoValor })
        .match(identifier);

    if (updateError) {
        console.error(`Erro ao incrementar campo '${field}' em ${table}:`, updateError);
        throw updateError;
    }
    return { [field]: novoValor };
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
            }
            // Adicione mais mapeamentos conforme necessário para seus operadores Sequelize
        } else if (key === 'emDestaque' && (value === null || value === false || Array.isArray(value) && (value.includes(false) || value.includes(null)))) {
            // Lógica específica para 'emDestaque' que pode ser [false, null]
            // Supabase não tem um 'in' para null e false tão direto, então se for para filtrar por não-destaque
            // pode ser necessário ajustar a query ou usar .or()
            if (Array.isArray(value) && value.includes(false) && value.includes(null)) {
                 // Supabase não permite .in(null, false) diretamente, precisa de .or
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

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                const order = options.order ? options.order[0] : ['createdAt', 'desc'];

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
                // Supabase não tem um método 'increment' direto como Sequelize.
                // Requer buscar, incrementar localmente e atualizar.
                // A 'identifier' é crucial aqui, geralmente o 'where' do options.
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para incrementar no Supabase.");
                }
                return incrementFieldSupabase('animes', field, identifier);
            }
            return dbSequelize.Anime.increment(field, options);
        },

        // Métodos CRUD adicionais para Supabase, se forem chamados diretamente
        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar anime.');
                const { data, error } = await supabaseAdmin.from('animes').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Anime.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar anime.');
                const identifier = options.where; // Assumindo { where: { slug: '...' } }
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para atualizar no Supabase.");
                }
                let query = supabaseAdmin.from('animes').update(values);
                query = mapWhereClauseToSupabase(query, identifier); // Aplica o 'where' para o update
                const { data, error } = await query.select(); // Retorna os dados atualizados
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Anime.update(values, options);
        },
        destroy: async (options = {}) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar anime.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('animes').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true }; // Supabase delete retorna { error } ou null, não um número de linhas
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

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar episódio.');
                             const { data, error } = await supabaseAdmin.from('episodios').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Episodio.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar episódio.');
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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar episódio.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('episodios').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
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

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar post.');
                const { data, error } = await supabaseAdmin.from('posts').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Post.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar post.');
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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar post.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('posts').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
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

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                // Para criação de usuário via Supabase, geralmente usamos o `auth.signUp`
                // ou `auth.admin.createUser` se for um admin.
                // O método aqui seria para criar usuários diretamente na tabela 'users'
                // após o signup, ou para usuários criados por admin.
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar usuário.');
                const { data, error } = await supabaseAdmin.from('users').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.User.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar usuário.');
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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar usuário.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('users').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
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
                let query = supabase.from('historicos').select('*'); // Assumindo uma tabela 'historicos'
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                // findOrCreate requer uma lógica mais complexa no Supabase:
                // 1. Tentar encontrar o registro.
                // 2. Se não encontrar, criar.
                const { where, defaults } = options;
                let query = supabase.from('historicos').select('*');
                query = mapWhereClauseToSupabase(query, where);
                const { data: foundData, error: findError } = await query.limit(1);

                if (findError) throw findError;

                if (foundData && foundData.length > 0) {
                    // Encontrado, então atualiza o 'updatedAt' se necessário, ou retorna
                    const { data: updatedData, error: updateError } = await supabaseAdmin.from('historicos')
                        .update({ ...defaults, updatedAt: new Date().toISOString() }) // Força update do updatedAt
                        .match(where)
                        .select();
                    if (updateError) throw updateError;
                    return [updatedData[0], false]; // Retorna o registro atualizado e 'false' (não foi criado)
                } else {
                    // Não encontrado, criar
                    const { data: createdData, error: createError } = await supabaseAdmin.from('historicos').insert([{ ...where, ...defaults }]).select();
                    if (createError) throw createError;
                    return [createdData[0], true]; // Retorna o registro criado e 'true' (foi criado)
                }
            }
            return dbSequelize.Historico.findOrCreate(options);
        },
        create: async (values) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para criar histórico.');
                const { data, error } = await supabaseAdmin.from('historicos').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Historico.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para atualizar histórico.');
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
                if (!supabaseAdmin) throw new Error('Cliente Supabase Admin não disponível para deletar histórico.');
                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = supabaseAdmin.from('historicos').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
            }
            return dbSequelize.Historico.destroy(options);
        }
    },

    // ------------------- COMENTÁRIO -------------------
    Comment: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('comments').select('*'); // Assumindo uma tabela 'comments'
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                if (!supabase) throw new Error('Cliente Supabase não disponível para criar comentário.');
                const { data, error } = await supabase.from('comments').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Comment.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                // Atualização de comentários pode ser feita pelo próprio usuário ou por um admin
                // Se for por um admin, use supabaseAdmin. Se for pelo usuário, use supabase padrão e RLS.
                // Para simplificar no proxy, usamos supabaseAdmin se disponível, garantindo privilégios.
                const client = supabaseAdmin || supabase;
                if (!client) throw new Error('Cliente Supabase não disponível para atualizar comentário.');

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
                const client = supabaseAdmin || supabase; // Admin ou usuário com RLS para deletar próprio
                if (!client) throw new Error('Cliente Supabase não disponível para deletar comentário.');

                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = client.from('comments').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
            }
            return dbSequelize.Comment.destroy(options);
        }
    },

    // ------------------- RATING -------------------
    Rating: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('ratings').select('*'); // Assumindo uma tabela 'ratings'
                query = mapWhereClauseToSupabase(query, options.where);

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);
                if (options.offset) query = query.range(options.offset, options.offset + options.limit - 1);

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
                    const { data: updatedData, error: updateError } = await supabase.from('ratings')
                        .update(defaults) // Atualiza com os defaults (que contêm a nova nota)
                        .match(where)
                        .select();
                    if (updateError) throw updateError;
                    return [updatedData[0], false];
                } else {
                    // Não encontrado, criar
                    const { data: createdData, error: createError } = await supabase.from('ratings').insert([{ ...where, ...defaults }]).select();
                    if (createError) throw createError;
                    return [createdData[0], true];
                }
            }
            return dbSequelize.Rating.findOrCreate(options);
        },
        create: async (values) => {
            if (useSupabase) {
                if (!supabase) throw new Error('Cliente Supabase não disponível para criar avaliação.');
                const { data, error } = await supabase.from('ratings').insert([values]).select();
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Rating.create(values);
        },
        update: async (values, options) => {
            if (useSupabase) {
                const client = supabaseAdmin || supabase;
                if (!client) throw new Error('Cliente Supabase não disponível para atualizar avaliação.');

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
                if (!client) throw new Error('Cliente Supabase não disponível para deletar avaliação.');

                const identifier = options.where;
                if (!identifier || Object.keys(identifier).length === 0) {
                    throw new Error("Identificador 'where' é necessário para deletar no Supabase.");
                }
                let query = client.from('ratings').delete();
                query = mapWhereClauseToSupabase(query, identifier);
                const { error } = await query;
                if (error) throw error;
                return { success: true };
            }
            return dbSequelize.Rating.destroy(options);
        },
        // Método para calcular média de rating (exemplo)
        // Isso seria mais complexo com Supabase, talvez uma função SQL ou view
        // Mas para uma query simples, buscaria todos os ratings e faria o cálculo.
        getAverageRating: async (animeId) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('ratings')
                    .select('nota')
                    .eq('animeId', animeId);

                if (error) throw error;

                if (data.length === 0) return 0;

                const totalNotas = data.reduce((sum, r) => sum + r.nota, 0);
                return totalNotas / data.length;
            }
            // Fallback Sequelize
            const { sum, count } = await dbSequelize.Rating.findOne({
                attributes: [
                    [dbSequelize.sequelize.fn('SUM', dbSequelize.sequelize.col('nota')), 'totalNotas'],
                    [dbSequelize.sequelize.fn('COUNT', dbSequelize.sequelize.col('id')), 'totalAvaliacoes']
                ],
                where: { animeId },
                raw: true // Retorna resultados puros
            });

            if (count === 0) return 0;
            return sum / count;
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