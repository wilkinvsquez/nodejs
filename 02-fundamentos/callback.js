// setTimeout(() => {

// }, timeout);

const getUsuarioById = (id) => {
  const usuario = {
    id,
    nombre: "Wilkin",
  };
  setTimeout(() => {
    console.log(usuario);
  }, 1500);
};

getUsuarioById(10);
