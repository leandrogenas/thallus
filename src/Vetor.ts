
export type Ponto = {
  x: number
  y: number,
  z: number
}

export class Vetor {
  
  static NORMAL = new Vetor(1, 1, 1);

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) { }

  absoluto(): Ponto
  {
    const {x, y, z} = this;
    return {
      x: Math.abs(x),
      y: Math.abs(y),
      z: Math.abs(z)
    }
  }
  
  normalizado()
  {
    const {x, y, z} = this;
    const N = Vetor.NORMAL;
    return {
      x: (x / N.x),
      y: (y / N.y),
      z: (z / N.z)
    }
  }

  transposta()
  {

  }

  produto(v: Vetor | Ponto)
  {
    if(!(v instanceof Vetor))
      v = Vetor.De(v);
    

  }

  ponto(): Ponto
  {
    const {x, y, z} = this;
    return {x, y, z}
  }

  static De(p: Ponto)
  {
    return new Vetor(p.x, p.y, p.z);
  }

}