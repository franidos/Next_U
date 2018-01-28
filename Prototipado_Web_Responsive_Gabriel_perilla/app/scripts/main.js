console.log('\'Allo \'Allo!');

var menu=document.querySelector("#menu");

var menuItems=[
	{"item":"Objetivos y Métricas"},
	{"item":"Mapeo de Campañas"},
	{"item":"Evaluación de Campañas","state":"analisisCampanas"},
	{"item":"Túneles de Conversión"},
	{"item":"Análisis de Canales","state":"analisisCanales"}
];
var menuContext={menuItems};
menu.innerHTML=MarketingApp.menu(menuContext);

var appContent=document.querySelector("#appContent");

var footer=document.querySelector("#footer");

footer.innerHTML=MarketingApp.footer();


function getStateTitle(state){ 
 for(var i=0;i<menuItems.length;i++){ 
   if(menuItems[i].state === state){  
     return menuItems[i].item;   
 }  
} 
}; 
 
function changeState(state){ 
 
 $(".menuLinks").removeClass("menuActive");  
 $("#"+state+"Link").addClass("menuActive");  
 appContent.innerHTML=MarketingApp.appContent({title:getStateTitle(state ),state:state}); 
 
 var statePage=document.querySelector("#"+state);  
 statePage.innerHTML=MarketingApp[state](); 
  if(state==="analisisCampanas"){  
   var sliders=document.querySelectorAll(".sliders");  
    sliders.forEach(function(slider){   
     slider.innerHTML=MarketingApp.slider();   
      noUiSlider.create(slider.querySelector(".filterSliders"),{  
         start:[50,100],     
         conect:true,     
         step:1,     
         range:{      
         	'min':0,      
         	'max':100    
         	 },     
         format:wNumb({      
         	decimals:0     
         })    
     }); 
 
   });    
    $('#datepickerFrom').pickadate({      
    selectMonths: true,       
     selectYears: 17    
      });    

   $('#datepickerTo').pickadate({     
     selectMonths: true,      
      selectYears: 17    
       }); 
    } 
 
}; 

changeState("analisisCanales"); 
 
$(".button-collapse").sideNav(); 
 
