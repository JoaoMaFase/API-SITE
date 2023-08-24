import connection from "./connection.js";


export async function listarTodos() {
  let comando = `
    select id_agenda      as id,
           nm_contato     as contato,
           ds_telefone    as telefone,
           ds_email       as email,
           bt_favorito    as favorito,
           dt_cadastro    as dtCadastro 
      from tb_agenda
  `

  let [dados] = await connection.query(comando);
  return dados;
}


export async function listarPorNome(nome) {
  let comando = `
    select id_agenda       as id,
            nm_contato     as contato,
            ds_telefone    as telefone,
            ds_email       as email,
            bt_favorito    as favorito,
            dt_cadastro    as dtCadastro
      from tb_agenda where nm_contato like ?
  `

  let [dados] = await connection.query(comando, ['%'+nome+'%']);
  return dados;
}


export async function listarFavoritos() {
  let comando = `
    select id_agenda       as id,
            nm_contato     as contato,
            ds_telefone    as telefone,
            ds_email       as email,
            bt_favorito    as favorito,
            dt_cadastro    as dtCadastro
      from tb_agenda where bt_favorito = true
  `

  let [dados] = await connection.query(comando);
  return dados;
}


export async function listarPorIntervalo(inicio, fim) {
  let comando = `
      select id_agenda   as id,
          nm_contato     as contato,
          ds_telefone    as telefone,
          ds_email       as email,
          bt_favorito    as favorito,
          dt_cadastro    as dtCadastro
      from tb_agenda where dt_cadastro between ? and ?
  `

  let [dados] = await connection.query(comando, [inicio, fim]);
  return dados;
}


export async function inserir(agenda) {
  let comando = `
    insert into tb_agenda (nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro)
                   values (?, ?, ?, ?, ?)
  `

  let [info] = await connection.query(comando,
    [
      agenda.nome,
      agenda.telefone,
      agenda.email,
      agenda.favorito,
      agenda.cadastro
    ]);
  
  agenda.id = info.insertId;
  return agenda;
}



export async function alterar(id, agenda) {
  let comando = `
    update tb_agenda 
      set nm_contato = ?, 
          ds_telefone = ?, 
          ds_email = ?, 
          bt_favorito = ?, 
          dt_cadastro = ?
    where id_agenda = ?
  `

  let [info] = await connection.query(comando,
    [
      agenda.nome,
      agenda.telefone,
      agenda.email,
      agenda.favorito,
      agenda.cadastro,
      id
    ]);
  
  let linhasAfetadas = info.affectedRows;
  return linhasAfetadas;
}



export async function deletar(id) {
  let comando = `
    delete from tb_agenda where id_agenda = ?
  `

  let [info] = await connection.query(comando, [id]);
  let linhasAfetadas = info.affectedRows;
  return linhasAfetadas;
}