// ====================================================================================
//              DenyAnimeHub - Utilitário para Geração de Slugs
//
// Descrição:     Função essencial que converte uma string (como um título de anime)
//                em um formato amigável para URLs (slug).
// ====================================================================================

'use strict';

function slugify(text) {
  if (typeof text !== 'string') {
    return '';
  }

  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrssssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(p, c => b.charAt(a.indexOf(c))) // Substitui caracteres especiais
    .replace(/&/g, '-and-') // Substitui & por 'and'
    .replace(/[^\w\-]+/g, '') // Remove todos os caracteres não-palavra
    .replace(/\-\-+/g, '-') // Substitui múltiplos - por um único -
    .replace(/^-+/, '') // Remove - do início do texto
    .replace(/-+$/, '') // Remove - do final do texto
}

module.exports = slugify;