const el = document.querySelector(".item");

let isResizing = false;

const bars = document.querySelectorAll(".bar");
console.log('bars: ',bars)
let currentBar;


const toggleButtons = document.querySelectorAll("button");
    
toggleButtons.forEach((e) => {
    console.log(e.parentElement)
    e.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.classList.toggle("collapsed")
    })
})


// document.getElementById("leftBtn").classList.toggle("collapsed");

for (let bar of bars) {
  bar.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentBar = e.target;
    isResizing = true;

    const parent = currentBar.parentElement;

    console.log('currentBar', currentBar)
    // console.log(parent)
    // console.log('next sibling: ', parent.nextElementSibling, parent.nextElementSibling.style.minWidth);
    // const container = parent.parentElement;
    // console.log(container);
    // console.log(container.childElements);
    // console.log('children', container.children)
    

    // for(const child in container.children) {
    //     console.log(child)
    // }

    // const el = document.querySelector(".container")
    // const totalWidth = Object.values(document.querySelectorAll(".item")).reduce((total, i) => total + i.offsetWidth, 0)
    // console.log('total', totalWidth)

    

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);


    let getSiblings = function (e) {
        // for collecting siblings
        let siblings = []; 
        // if no parent, return no sibling
        if(!e.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling  = e.parentNode.firstChild;
        
        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };

    console.log("Child nodes:")
    console.log(parent.parentElement.childnodes)



  

    // let siblings = getSiblings(parent);
    //     const siblingText = siblings.map(e => e);
    //     console.log(siblingText);

    // const siblings = getSiblings(parent);
    // console.log(siblings)

    // for(const sibling in siblings){
    //     console.log(sibling)
    // }

    function mousemove(e) {
      const rect = parent.getBoundingClientRect();
    
      

    

      if (parent.classList.contains("left")) {
        const leftColChange = rect.width - (prevX - e.clientX);
        console.log('left: ', leftColChange)

        const container = document.querySelector(".container")
        const containerWidth = container.offsetWidth;
        const minWorkspaceWidth = getComputedStyle(container).getPropertyValue('--minWorkspaceWidth');
        const workspaceWidth = container.children[1].offsetWidth;
        const rightColWidth = container.children[2].offsetWidth;

        console.log('Container width: ', containerWidth);
        console.log('Workspace width: ', workspaceWidth);
        console.log('rightCol Width: ', rightColWidth);
        console.log('min workspace width: ', minWorkspaceWidth)

        const maxLeftColWidth = parseInt(containerWidth) - parseInt(minWorkspaceWidth) - parseInt(rightColWidth);

        console.log('max left col width:  ', maxLeftColWidth);




        // const container = document.querySelector('container');
        // const totalWidth = CSSContainerRule.offsetWidth;
        // console.log('total', totalWidth)

        
        // const delta = totalWidth - container.children[1].offsetWidth-container.children[2].offsetWidth;

        // console.log(delta)
        if (leftColChange <= maxLeftColWidth){
            parent.style.width = leftColChange + "px";
            prevX = e.clientX;
            prevY = e.clientY;
        } else {
            parent.style.width = maxLeftColWidth;
            // prevX = e.clientX;
            prevY = e.clientY;
        }
        // parent.style.width = rect.width - (prevX - e.clientX) + "px";
      } else if (parent.classList.contains("right")) {
        console.log('right: ', rect.width + (prevX - e.clientX))
        parent.style.width = rect.width + (prevX - e.clientX) + "px";
        prevX = e.clientX;
        prevY = e.clientY;
      }

    //   if (currentResizer.classList.contains("se")) {
    //     el.style.width = rect.width - (prevX - e.clientX) + "px";
    //     el.style.height = rect.height - (prevY - e.clientY) + "px";
    //   } else if (currentResizer.classList.contains("sw")) {
    //     el.style.width = rect.width + (prevX - e.clientX) + "px";
    //     el.style.height = rect.height - (prevY - e.clientY) + "px";
    //     el.style.left = rect.left - (prevX - e.clientX) + "px";
    //   } else if (currentResizer.classList.contains("ne")) {
    //     el.style.width = rect.width - (prevX - e.clientX) + "px";
    //     el.style.height = rect.height + (prevY - e.clientY) + "px";
    //     el.style.top = rect.top - (prevY - e.clientY) + "px";
    //   } else {
    //     el.style.width = rect.width + (prevX - e.clientX) + "px";
    //     el.style.height = rect.height + (prevY - e.clientY) + "px";
    //     el.style.top = rect.top - (prevY - e.clientY) + "px";
    //     el.style.left = rect.left - (prevX - e.clientX) + "px";
    //   }

    //   prevX = e.clientX;
    //   prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
    }
  }
}



// const resizers = document.querySelectorAll(".resizer");
// let currentResizer;

// for (let resizer of resizers) {
//   resizer.addEventListener("mousedown", mousedown);

//   function mousedown(e) {
//     currentResizer = e.target;
//     isResizing = true;

//     let prevX = e.clientX;
//     let prevY = e.clientY;

//     window.addEventListener("mousemove", mousemove);
//     window.addEventListener("mouseup", mouseup);

//     function mousemove(e) {
//       const rect = el.getBoundingClientRect();

//       if (currentResizer.classList.contains("se")) {
//         el.style.width = rect.width - (prevX - e.clientX) + "px";
//         el.style.height = rect.height - (prevY - e.clientY) + "px";
//       } else if (currentResizer.classList.contains("sw")) {
//         el.style.width = rect.width + (prevX - e.clientX) + "px";
//         el.style.height = rect.height - (prevY - e.clientY) + "px";
//         el.style.left = rect.left - (prevX - e.clientX) + "px";
//       } else if (currentResizer.classList.contains("ne")) {
//         el.style.width = rect.width - (prevX - e.clientX) + "px";
//         el.style.height = rect.height + (prevY - e.clientY) + "px";
//         el.style.top = rect.top - (prevY - e.clientY) + "px";
//       } else {
//         el.style.width = rect.width + (prevX - e.clientX) + "px";
//         el.style.height = rect.height + (prevY - e.clientY) + "px";
//         el.style.top = rect.top - (prevY - e.clientY) + "px";
//         el.style.left = rect.left - (prevX - e.clientX) + "px";
//       }

//       prevX = e.clientX;
//       prevY = e.clientY;
//     }

//     function mouseup() {
//       window.removeEventListener("mousemove", mousemove);
//       window.removeEventListener("mouseup", mouseup);
//       isResizing = false;
//     }
//   }
// }