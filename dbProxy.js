// dbProxy.js
const { createClient } = require('@supabase/supabase-js');
const { Sequelize, DataTypes, Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

require('dotenv').config(); // Garante que as variáveis de ambiente estejam carregadas

let db = {}; // Objeto que irá conter os modelos ativos (Supabase ou Sequelize)
let supabase = null;
let sequelize = null;
let useSupabase = false;

// 1. Verificar variáveis de ambiente do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    console.log('Detectadas variáveis de ambiente do Supabase. Tentando usar Supabase como principal.');
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        useSupabase = true;
        console.log('Supabase configurado.');
    } catch (err) {
        console.error('Erro ao inicializar Supabase:', err.message);
        console.warn('Caindo para Sequelize como fallback.');
        useSupabase = false;
    }
} else {
    console.warn('Variáveis de ambiente SUPABASE_URL ou SUPABASE_ANON_KEY não encontradas. Usando Sequelize.');
    useSupabase = false;
}

// 2. Se não estiver usando Supabase, configurar Sequelize
if (!useSupabase) {
    const DATABASE_URL = process.env.DATABASE_URL;

    if (!DATABASE_URL) {
        console.error('ERRO: DATABASE_URL não definida. Sequelize não pode ser configurado.');
        // Este erro é crítico se o Supabase não estiver ativo. O app não terá DB.
    } else {
        console.log('Configurando Sequelize...');
        sequelize = new Sequelize(DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            logging: false, // Desative o logging do SQL para não poluir o console
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Necessário para alguns provedores como Render, Heroku
                }
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        // Carregar modelos Sequelize
        const modelsDir = path.join(__dirname, 'models');
        fs.readdirSync(modelsDir)
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
            })
            .forEach(file => {
                const model = require(path.join(modelsDir, file))(sequelize, DataTypes);
                db[model.name] = model;
            });

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
    }
}

// ====================================================================================
// Interfaces Unificadas para Modelos
// ====================================================================================

// Funções utilitárias para Supabase (simulação Sequelize)
const supabaseModels = {};

// Função para simular 'findAndCountAll' do Sequelize para Supabase
const findAndCountAllSupabase = async (modelName, options) => {
    let query = supabase.from(modelName);

    // Filtros 'where'
    if (options.where) {
        for (const key in options.where) {
            const condition = options.where[key];
            if (typeof condition === 'object' && condition !== null && !Array.isArray(condition)) {
                if (condition[Op.iLike]) {
                    query = query.ilike(key, condition[Op.iLike]);
                } else if (condition[Op.gte]) { // Greater than or equal
                    query = query.gte(key, condition[Op.gte]);
                }
                // Adicione mais operadores Supabase conforme necessário
                // Ex: Op.eq -> eq(key, value)
                // Ex: Op.ne -> ne(key, value)
                // Ex: Op.in -> in(key, valueArray)
            } else {
                query = query.eq(key, condition);
            }
        }
    }

    // Ordenação
    if (options.order && options.order.length > 0) {
        options.order.forEach(([field, direction]) => {
            query = query.order(field, { ascending: direction.toLowerCase() === 'asc' });
        });
    }

    // Paginação
    let totalCountQuery = supabase.from(modelName).select('count', { count: 'exact' });
    if (options.where) { // Aplica os filtros também na contagem
        for (const key in options.where) {
            const condition = options.where[key];
            if (typeof condition === 'object' && condition !== null && !Array.isArray(condition)) {
                if (condition[Op.iLike]) {
                    totalCountQuery = totalCountQuery.ilike(key, condition[Op.iLike]);
                } else if (condition[Op.gte]) {
                    totalCountQuery = totalCountQuery.gte(key, condition[Op.gte]);
                }
            } else {
                totalCountQuery = totalCountQuery.eq(key, condition);
            }
        }
    }

    const { count, error: countError } = await totalCountQuery;
    if (countError) throw countError;

    if (options.limit && options.offset !== undefined) {
        query = query.range(options.offset, options.offset + options.limit - 1);
    } else if (options.limit) {
        query = query.limit(options.limit);
    }


    const { data, error } = await query;
    if (error) throw error;

    return { count: count || 0, rows: data };
};

// Cria uma interface para cada "modelo" no Supabase que simula métodos Sequelize
const createSupabaseModel = (tableName) => ({
    tableName, // Armazena o nome real da tabela Supabase
    // Simula `findAll`
    findAll: async (options = {}) => {
        let query = supabase.from(tableName).select('*'); // Supabase select '*'

        if (options.where) {
            for (const key in options.where) {
                const condition = options.where[key];
                if (typeof condition === 'object' && condition !== null && !Array.isArray(condition)) {
                    if (condition[Op.iLike]) {
                        query = query.ilike(key, condition[Op.iLike]);
                    } else if (condition[Op.gte]) {
                        query = query.gte(key, condition[Op.gte]);
                    }
                    // Adicione outros operadores aqui
                } else {
                    query = query.eq(key, condition);
                }
            }
        }
        if (options.order && options.order.length > 0) {
            options.order.forEach(([field, direction]) => {
                query = query.order(field, { ascending: direction.toLowerCase() === 'asc' });
            });
        }
        if (options.limit) {
            query = query.limit(options.limit);
        }
        // Incluir relacionamentos é complexo no Supabase, precisaria de JOINs customizados ou múltiplas queries.
        // Por enquanto, esta simulação não suporta 'include' diretamente.
        const { data, error } = await query;
        if (error) throw error;
        // Supabase não retorna 'get({plain: true})', então retornamos os dados crus
        return data;
    },
    // Simula `findOne`
    findOne: async (options = {}) => {
        let query = supabase.from(tableName).select('*');
        if (options.where) {
            for (const key in options.where) {
                const condition = options.where[key];
                if (typeof condition === 'object' && condition !== null && !Array.isArray(condition)) {
                    if (condition[Op.iLike]) {
                        query = query.ilike(key, condition[Op.iLike]);
                    } else if (condition[Op.gte]) {
                        query = query.gte(key, condition[Op.gte]);
                    }
                } else {
                    query = query.eq(key, condition);
                }
            }
        }
        const { data, error } = await query.single(); // Supabase .single() para um único resultado
        if (error && error.code !== 'PGRST116') { // PGRST116: No rows found, que é como findOne retorna null
            throw error;
        }
        return data || null;
    },
    // Simula `findByPk`
    findByPk: async (id) => {
        const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
        if (error && error.code !== 'PGRST116') throw error;
        return data || null;
    },
    // Simula `create`
    create: async (data) => {
        const { data: created, error } = await supabase.from(tableName).insert([data]).select().single();
        if (error) throw error;
        return created;
    },
    // Simula `update`
    update: async (data, options) => {
        if (!options || !options.where) {
            throw new Error('Atualização no Supabase requer uma cláusula where.');
        }
        let query = supabase.from(tableName);
        for (const key in options.where) {
            query = query.eq(key, options.where[key]);
        }
        const { data: updated, error } = await query.update(data).select();
        if (error) throw error;
        return [updated.length, updated]; // Retorna no formato [count, rows]
    },
    // Simula `destroy`
    destroy: async (options) => {
        if (!options || !options.where) {
            throw new Error('Exclusão no Supabase requer uma cláusula where.');
        }
        let query = supabase.from(tableName);
        for (const key in options.where) {
            query = query.eq(key, options.where[key]);
        }
        const { error, count } = await query.delete({ count: 'exact' }); // Conta quantos foram deletados
        if (error) throw error;
        return count; // Retorna o número de itens deletados
    },
    // Simula `increment` (simples, apenas um campo)
    increment: async (field, options) => {
        if (!options || !options.where) {
            throw new Error('Incremento no Supabase requer uma cláusula where.');
        }
        let currentItem = await supabase.from(tableName).select(field).match(options.where).single();
        if (!currentItem || currentItem.error) throw new Error('Item não encontrado para incremento.');

        const currentValue = currentItem.data[field] || 0;
        const newValue = currentValue + 1; // Incrementa por 1, ajustar se quiser outro valor

        let query = supabase.from(tableName);
        for (const key in options.where) {
            query = query.eq(key, options.where[key]);
        }
        const { data, error } = await query.update({ [field]: newValue }).select();
        if (error) throw error;
        return data; // Retorna o item atualizado
    },
    // Simula `count`
    count: async (options = {}) => {
        let query = supabase.from(tableName).select('count', { count: 'exact' });
        if (options.where) {
            for (const key in options.where) {
                query = query.eq(key, options.where[key]);
            }
        }
        const { count, error } = await query;
        if (error) throw error;
        return count;
    },
    // Simula `findAndCountAll`
    findAndCountAll: async (options = {}) => findAndCountAllSupabase(tableName, options),

    // Para compatibilidade, Supabase não tem 'get({plain: true})'
    // Mas podemos adicionar uma função que retorna o objeto "limpo"
    get: function(options) {
        return this; // Retorna o próprio objeto de dados
    },
    // Adiciona métodos para relacionamentos Supabase (exemplo básico)
    // Isso é mais complexo e pode precisar de funções helper no supabaseConnector.js
    // ou de tratamento específico no controller.
    // getEpisodios: async (id) => {
    //     const { data, error } = await supabase.from('Episodios').select('*').eq('animeId', id);
    //     if (error) throw error;
    //     return data;
    // }
});


if (useSupabase) {
    // Mapeie suas tabelas do Supabase para interfaces simuladas do Sequelize
    supabaseModels.Anime = createSupabaseModel('Animes'); // Assumindo 'Animes' é o nome da sua tabela
    supabaseModels.Episodio = createSupabaseModel('Episodios');
    supabaseModels.User = createSupabaseModel('Users');
    supabaseModels.Post = createSupabaseModel('Posts');
    supabaseModels.Historico = createSupabaseModel('Historicos');
    supabaseModels.Comment = createSupabaseModel('Comments'); // Se tiver
    supabaseModels.Rating = createSupabaseModel('Ratings'); // Se tiver

    // Exponha os modelos Supabase
    db = supabaseModels;
    // Exponha o cliente Supabase diretamente, se necessário para operações mais complexas
    db.supabase = supabase;
    // Exponha Op para compatibilidade com queries (embora a implementação seja via simulador)
    db.Op = Op;
    // Adicione uma flag para indicar o banco de dados ativo
    db.useSupabase = true;
    // Adicione um placeholder para sequelize e Sequelize se Supabase for usado
    db.sequelize = { authenticate: async () => console.log('Supabase ativo, Sequelize ignorado.') };
    db.Sequelize = Sequelize; // Para o literal('RANDOM()') se necessário, embora precise ser simulado
    console.log('dbProxy configurado para usar SUPABASE.');

} else {
    // Sequelize já está configurado no `db`
    db.Op = Op; // Garante que Op esteja disponível
    db.useSupabase = false;
    console.log('dbProxy configurado para usar SEQUELIZE.');
}

// Exportar o objeto 'db' que agora contém os modelos (Supabase simulados ou Sequelize reais)
module.exports = db;