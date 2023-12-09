const config = {
  user :'sa',
  password :'123',
  server:'127.0.0.1',
  database:'testDB',
  options:{
      trustedconnection: true,
      enableArithAbort : true, 
      instancename :'SQLEXPRESS'
  },
  port : 49883
}

module.exports = config; 