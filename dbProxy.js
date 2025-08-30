// ====================================================================================
//
//      dbProxy.js - DenyAnimeHub (Versão Definitiva e Robusta)
//
// ====================================================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const dbSequelize = require('./models'); // Mantém Sequelize como fallback
const { Op } = require('sequelize');

// --- 1. CONFIGURAÇÃO SUPABASE ---
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Flag para definir se usamos Supabase como banco primário
const useSupabase = true;

// --- 2. FUNÇÃO AUXILIAR PARA INCREMENTOS ---
async function incrementField(table, field, identifier) {
    const { data, error } = await supabase
        .from(table)
        .select(field)
        .match(identifier)
        .limit(1);

    if (error) throw error;
    if (!data || data.length === 0) return null;

    const novoValor = (data[0][field] || 0) + 1;
    const { error: updateError } = await supabase
        .from(table)
        .update({ [field]: novoValor })
        .match(identifier);

    if (updateError) throw updateError;
    return { [field]: novoValor };
}

// ====================================================================================
// --- 3. PROXY PROFISSIONAL PARA MODELS
// ====================================================================================
const db = {

    // ------------------- ANIME -------------------
    Anime: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                let query = supabase.from('animes').select('*');

                if (options.order) {
                    const [field, dir] = options.order[0];
                    query = query.order(field, { ascending: dir.toUpperCase() === 'ASC' });
                }
                if (options.limit) query = query.limit(options.limit);

                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
            return dbSequelize.Anime.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                const slug = options?.where?.slug;
                const { data, error } = await supabase.from('animes').select('*').eq('slug', slug).limit(1);
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

                const { data, count, error } = await supabase
                    .from('animes')
                    .select('*', { count: 'exact' })
                    .range(offset, offset + limit - 1)
                    .order(order[0], { ascending: order[1].toUpperCase() === 'ASC' });

                if (error) throw error;
                return { rows: data, count };
            }
            return dbSequelize.Anime.findAndCountAll(options);
        },

        increment: async (field, options) => {
            if (useSupabase) {
                const slug = options?.where?.slug;
                return incrementField('animes', field, { slug });
            }
            return dbSequelize.Anime.increment(field, options);
        }
    },

    // ------------------- EPISODIO -------------------
    Episodio: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('episodios').select('*');
                if (error) throw error;
                return data;
            }
            return dbSequelize.Episodio.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                const id = options?.where?.id;
                const { data, error } = await supabase.from('episodios').select('*').eq('id', id).limit(1);
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.Episodio.findOne(options);
        },

        create: async (values) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('episodios').insert([values]);
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Episodio.create(values);
        },

        destroy: async (options = {}) => {
            if (useSupabase) {
                const id = options?.where?.id;
                const { error } = await supabase.from('episodios').delete().eq('id', id);
                if (error) throw error;
                return { success: true };
            }
            return dbSequelize.Episodio.destroy(options);
        }
    },

    // ------------------- POST -------------------
    Post: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('posts').select('*');
                if (error) throw error;
                return data;
            }
            return dbSequelize.Post.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                const slug = options?.where?.slug;
                const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).limit(1);
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.Post.findOne(options);
        },

        create: async (values) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('posts').insert([values]);
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Post.create(values);
        },

        update: async (values, options) => {
            if (useSupabase) {
                const id = options?.where?.id;
                const { data, error } = await supabase.from('posts').update(values).eq('id', id);
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Post.update(values, options);
        },

        destroy: async (options = {}) => {
            if (useSupabase) {
                const id = options?.where?.id;
                const { error } = await supabase.from('posts').delete().eq('id', id);
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
                const { data, error } = await supabase.from('users').select('*');
                if (error) throw error;
                return data;
            }
            return dbSequelize.User.findAll(options);
        },

        findOne: async (options = {}) => {
            if (useSupabase) {
                const id = options?.where?.id;
                const { data, error } = await supabase.from('users').select('*').eq('id', id).limit(1);
                if (error) throw error;
                return data[0] || null;
            }
            return dbSequelize.User.findOne(options);
        }
    },

    // ------------------- HISTORICO -------------------
    Historico: {
        findAll: async (options = {}) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('historico').select('*');
                if (error) throw error;
                return data;
            }
            return dbSequelize.Historico.findAll(options);
        },

        create: async (values) => {
            if (useSupabase) {
                const { data, error } = await supabase.from('historico').insert([values]);
                if (error) throw error;
                return data[0];
            }
            return dbSequelize.Historico.create(values);
        }
    },

    // ------------------- SEQUELIZE ORIGINAL -------------------
    sequelize: dbSequelize.sequelize,
    Op
};

// Exporta DB Proxy
module.exports = db;
