
function startLearn(){
                    leftright_status = cookie.get("leftright");
                    //alert(leftriht_status);
                    longpic_status = cookie.get("longpic");
                    video_status = cookie.get("video");
                    updown_status = cookie.get("updown");
                    
                    if ("undefined"==typeof leftright_status){
                        cookie.set("leftright","start");
                    } else if (leftright_status=="learned"){
                        $("#leftright").attr("src","images/lock2.png");
                    }
                    
                    if ("undefined"==typeof longpic_status){
                        cookie.set("longpic","start");
                    } else if (longpic_status=="learned"){
                        $("#longpic").attr("src","images/lock2.png");
                    }
                    
                    if ("undefined"==typeof video_status){
                        cookie.set("video","start");
                    } else if (video_status=="learned"){
                        $("#video").attr("src","images/lock2.png");
                    }
                    
                    if ("undefined"==typeof updown_status){
                        cookie.set("updown","start");
                    } else if (updown_status=="learned"){
                        $("#updown").attr("src","images/lock2.png");
                    }
                    //alert("hahah")
                    //cookie.set("leftriht","start");
                    //$.cookie("")
                }