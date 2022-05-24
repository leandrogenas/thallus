import * as Zdog from 'zdog';
import { IsometricMap } from './Utils/IsometricMap';
import { Vetor } from './Vetor';


const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  zoom: 1,
  resize: true,

})

let illoAnchor = new Zdog.Anchor({
  addTo: illo
})

let illoOption = {
  isDragRotate: false,
  maxZoom: 15,
  minZoom: 0.001,
  stats: false
}

const map = new IsometricMap(
  illo,
  illoAnchor,
  100,
  125,
  'rgba(240, 200, 255, 0.95)'
)

// event start
// drag event
let dragStartX: number, dragStartY: number
new Zdog.Dragger({
    startElement: illo.element,
    onDragStart: function (pointer) {
        if (illoOption.isDragRotate) {
            dragStartX = illoAnchor.rotate.x
            dragStartY = illoAnchor.rotate.y
        } else {
            dragStartX = illoAnchor.translate.x
            dragStartY = illoAnchor.translate.y
        }
    },
    onDragMove: function (pointer, moveX, moveY) {
        if (illoOption.isDragRotate) {
            const displaySize = Math.min(illo.element.width as number, illo.element.height as number)
            const moveRY = moveX / displaySize * Zdog.TAU
            const moveRX = moveY / displaySize * Zdog.TAU
            illoAnchor.rotate.x = dragStartX - moveRX
            illoAnchor.rotate.y = dragStartY - moveRY
        } else {
            illoAnchor.translate.x = dragStartX + moveX / illo.zoom
            illoAnchor.translate.y = dragStartY + moveY / illo.zoom
        }
    },
    onDragEnd: function () { }
})

illo.element.addEventListener("wheel", (e: any) => {
  const rate = illo.zoom / 20
  const zoom = illo.zoom - (e.deltaY > 0 ? 1 : -1) * rate
  if (zoom > illoOption.maxZoom) zoom = illoOption.maxZoom
  if (zoom < illoOption.minZoom) zoom = illoOption.minZoom
  illo.zoom = zoom
}, false);

illo.element.addEventListener("click", (e: MouseEvent) => {
  console.log(e.movementX, e.movementY);
  map.newBoxAt(e.offsetX, e.offsetY);
});

illo.element.addEventListener("mousemove", (e: MouseEvent) => {
  map.selectionBoxAt(e.offsetX, e.offsetY);
  
}, false)

function animate() 
{
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();