const canvas = document.getElementById("canvas");
canvas.width = 1000
canvas.height= 600
const form = document.getElementById("form");
const lista = document.getElementById("lista")
const pontos = []

ctx = canvas.getContext("2d")
ctx.font = "10px Arial";


function graurad(grau){
    return((2 * Math.PI * grau)/360)
}

function desenhaPontos(){
    const dhmax = pontos.reduce((acc, p) => Math.max(acc, p.dh), -Infinity);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "orange";
    ctx.fillRect(canvas.width/2,canvas.height/2,20,20)
    
    pontos.forEach((p,i)=>{
    let {x,y} = p.ponto(dhmax,canvas.height)
    let pxl = Math.floor(x) + canvas.width/2
    let pyl = Math.floor(y) + canvas.height/2


    ctx.fillStyle = "blue";
    ctx.fillRect(pxl,pyl,10,10)
    ctx.fillStyle = "black";
    ctx.fillText(`p${i+1}`, pxl,pyl);
})
    

}

function updateList(container, pts){
    container.innerHTML = ""
    pts.forEach((p,i)=> {
        const e = document.createElement("div")
        const p1 = document.createElement("p")
        p1.textContent =`P${i+1}`
        const p2 = document.createElement("p")
        p2.textContent = `Fs:${p.fs} Fm:${p.fm} Fi:${p.fi}`
        const p3 = document.createElement("p")
        p3.textContent = `${p.projecao()}`
        const p4 = document.createElement("p")
        p4.textContent = `DH:${p.dh}  DN:${p.dn}`
        const btn = document.createElement("button")
        btn.addEventListener("click", e=>{
            e.preventDefault()
            pts.splice(i,1)
            updateList(container,pts)
            desenhaPontos(pts,)
        })

        e.appendChild(p1)
        e.appendChild(p2)
        e.appendChild(p2)
        e.appendChild(p4)
        e.appendChild(btn)
        container.appendChild(e)
    });
}

class Ponto{
    constructor(fs,fm,fi,av,ah){
        this.fs = fs;
        this.fm = fm;
        this.fi = fi;
        this.av = av;
        this.ah = ah;
        this.dh = (this.fs - this.fi) * (Math.cos(graurad(Math.abs(90-av))))**2
        this.dn = 50*(this.fs - this.fi)*Math.sin(2*graurad(Math.abs(90-av))) + this.fm
    }

    ponto(dhmax,h){
        let d = (this.dh/(dhmax*1.1)) * (h/2)
        let x = d * Math.cos(graurad(this.ah))
        let y = d * Math.sin(graurad(this.ah))
        return({x,y})
    }

    projecao(){
        let x = this.dh * Math.cos(graurad(this.ah))
        let y = this.dh * Math.sin(graurad(this.ah))

        return({x,y})
    }

}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);
  const fs = parseFloat(data.fs);
  const fm = parseFloat(data.fm);
  const fi = parseFloat(data.fi);
  const av = parseFloat(data.av);
  const ah = parseFloat(data.ah);
  
  pontos.push(new Ponto(fs,fm,fi,av,ah))
  desenhaPontos()
    updateList(lista,pontos)

    
})








