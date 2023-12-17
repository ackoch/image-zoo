


function getAspectRatio(image){
    let screenWidth = window.innerWidth;
    let breakpoints = image.dataset.imageFormats.split(',');

    let currentBreakpoint = breakpoints.find(breakpoint => {
        let [ratio, breakPointWidth] = breakpoint.split(' ');
        if(! breakPointWidth) return true; // default
        return screenWidth <= breakPointWidth;
    })

    let [ratio, breakPointWidth] = currentBreakpoint.split(' ');
    let [w, h] = ratio.split('by');
    return {n: ratio, w, h, r: (w/h) };
}

function getPhysicalDimensions(image, {r}){
    let step = 10;
    let dppx = window.devicePixelRatio;
    let width = Math.min(1600, image.width * dppx);
        width = Math.max(step, width - (width % step));
    let height = width / r;

    return {
        wid: Math.round(width),
        hei: Math.round(height)
    }

}

function loadImages(){

    let images = document.querySelectorAll('img[data-image-smart]');

    images.forEach(image => {
        let ratio = getAspectRatio(image);
        let dimensions = getPhysicalDimensions(image, ratio);
        let path = image.dataset.imagePath;
        let imageWidth = image.dataset.imageWidth || 0;
        let imageRatio = image.dataset.imageRatio || "";

        if(dimensions.wid > imageWidth || imageRatio != ratio.n){
            image.src = path 
            + ':' + ratio.n 
            + '?wid=' + dimensions.wid
            + '&hei=' + dimensions.hei
            + '&bfc=off'
            + '&qlt=70';

            image.dataset.imageWidth = dimensions.wid;
            image.dataset.imageRatio = ratio.n;
        }
    })
}

window.addEventListener('load', loadImages);
window.addEventListener('resize', loadImages);