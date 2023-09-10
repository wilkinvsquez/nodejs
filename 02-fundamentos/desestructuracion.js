const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneracion",
  getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder}`;
  },
};

const { nombre, apellido, poder } = deadpool;
console.log(deadpool.getNombre());
