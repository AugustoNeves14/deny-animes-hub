// supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // carrega variáveis do .env

const supabaseUrl = 'https://izwuglmezgkkbtpdvkct.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Função para buscar dados (exemplo)
export async function getAllData() {
  const { data: animes, error: animeError } = await supabase.from('animes').select('*');
  if (animeError) console.error('Erro ao buscar animes:', animeError);

  const { data: episodios, error: epiError } = await supabase.from('episodios').select('*');
  if (epiError) console.error('Erro ao buscar episódios:', epiError);

  const { data: posts, error: postError } = await supabase.from('posts').select('*');
  if (postError) console.error('Erro ao buscar posts:', postError);

  const { data: users, error: userError } = await supabase.from('users').select('*');
  if (userError) console.error('Erro ao buscar usuários:', userError);

  return { animes, episodios, posts, users };
}
