//d1Card  
 export function getD1CardHeight(chartHeight, height ) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.15);
    } else {
      height = height * 0.18;
    }
    return height;
  } 
//d1Radial
  export function getD1RadialHeight(chartHeight, height) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.36);
    } else {
      height = height * 0.33;
    }
    return height;
  } 
//d1Bar  
export function getD1BarHeight(chartHeight, height) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.34);
    } else {
      height = height * 0.28;
    }
    return height;
  }
//d1Treemap  
export  function getD1TreemapHeight(chartHeight, height) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.49);
    } else {
      height = height * 0.425;
    }
    return height;
  }
//d1Pie
export function getD1PieHeight(chartHeight, height) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.25);
    } else {
      height = height * 0.23;
    }
    return height;
  }  

//d2Barchart
  export function getD2BarHeight(dfHeight, height) {
  
    if (height === 969) {
      return dfHeight;
    } else if (height > 969) {
      return (height = height * 0.78);
    } else {
      height = height * 0.68;
    }
    return height;
  } 


      
//d2Masonry
  export function getD2MasonryHeight({ chartHeight, height }) {
  
    if (height === 969) {
      return chartHeight;
    } else if (height > 969) {
      return (height = height * 0.15);
    } else {
      height = height * 0.12;
    }
    return height;
  } 



 
export  function getYAxisSize(height) {
    var size=0
    size=height/60
    return size;
  }