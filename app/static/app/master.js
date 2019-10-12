var services = {
    navigation : function(){
        return {
            page : function(id){
                var pagear = document.querySelectorAll('.page');
                pagear = Array.prototype.slice.call(pagear);
                pagear.forEach(e =>{
                    try{
                        e.style.display = none;
                    }catch(Ee){

                    }
                })
                document.querySelector(".page"+id).style.display = "block";
            }
        }
    }
}

services.navigation().page(1);