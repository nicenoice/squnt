var key = 'Not Pressed Yet';
var Left = false;
var Right = false;
var Up = false;
var Down = false;
var Space = false;
var keyIsPressed = false;
function keyDown(k){
    key = k;
    keyIsPressed = true;
}

function keyUp(k){
    key = k;
    keyIsPressed = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

var scene = document.getElementById('scene');
var load = true;
var menu = false;
var game = false;
var lose = false;
var settings = false;
var shop = false;
var HowToPlay = false;
var checkLoad;
var loadTimes = 0;

    function playScene(){
        var score = 0;
        function random(min, max){
            return Math.round(Math.random() * (max - min) + min);
        }
        
        var x = 250;
        var y = 140;
        var genX = random(30, 500);
        var genY = random(30, 300);
        var shootX = 0;
        var checkShoot = 0;
        var shootY = 0;
        var gen = document.getElementById('generate');
        var shoot = document.getElementById('shoot');
        var player = document.getElementById('player');
        var scoreEl = document.getElementById('score');
        function gameLoop(){
            scoreEl.innerHTML = 'Score: ' + score;
            player.style.left = x + 'px';
            player.style.top = y + 'px';
            gen.style.left = genX + 'px';
            gen.style.top = genY + 'px';
            shoot.style.left = ((x + 30) + shootX) + 'px';
            shoot.style.top = ((y + 30) + shootY) + 'px';
            
            if(keyIsPressed && Space){
                if(shootX + x >= genX - 40 && shootX + x <= genX + 20 && shootY + y >= genY - 40 && shootY + y <= genY + 20){
                        genX = random(30, 500);
                        genY = random(30, 300);
                        score++;
                }
                
                
                if(checkShoot==0){
                    shootX--;
                } 
                
                if(checkShoot==1){
                    shootX++;
                }
                
                if(checkShoot==2){
                    shootY--;
                }
                
                if(checkShoot==3){
                    shootY++;
                }
                
                if(!(shootX + x >= 0) && checkShoot==0){
                    shootX = 0;
                }
                
                if(!(shootX + x <= 515) && checkShoot==1){
                    shootX = 0;
                }
                
                if(!(shootY + y >= 0) && checkShoot==2){
                    shootY = 0;
                }
                
                if(!(shootY + y <= 315) && checkShoot==3){
                    shootY = 0;
                }
                
            } else {
                shootX = 0;
                shootY = 0;
            }
            
            if(keyIsPressed && Left && x >= 0){
                x-=2;
                checkShoot = 0;
            }
            
            if(keyIsPressed && Right && x < 515){
                x+=2;
                checkShoot = 1;
            }
            
            if(keyIsPressed && Up && y >= 0){
                y-=2;
                checkShoot = 2;
            }
            
            if(keyIsPressed && Down && y < 315){
                y+=2;
                checkShoot = 3;
            }
        }
        
        var loop = setInterval(gameLoop);
    }
    
    function loading(){
        loadTimes++;
        
        document.getElementById('dev-load').innerHTML = 'Loading (' + loadTimes + '/100)';
        
        if(loadTimes >= 100){
            document.getElementById('dev-load').style.left = '175px';
            menu = true;
            clearInterval(checkLoad);
        }
    }

    function switchScene(name){
        scene.innerHTML = document.getElementById(name + '-scene').textContent;
    }
    
    function checkScene(){
        
        if(load){
            switchScene('load');
            checkLoad = setInterval(loading, 20);
            load = false;
            
        }
        
        if(menu){
            switchScene('menu');
            menu = false;
        }
        
        if(game){
            switchScene('game');
            playScene();
            game = false;
        }
        
        if(lose){
            switchScene('lose');
        }
        
        if(settings){
            switchScene('settings');
        }
        
        if(shop){
            switchScene('shop');
        }
        
        if(HowToPlay){
            switchScene('htp');
        }
    }
    
    function checkIfPressed(){
        if(key != 'Not Pressed Yet'){
            checkKey();
        }
    }
    
    function checkKey(){
        if(key.key==' '){
            Space = true;
            Left = false;
            Right = false;
            Up = false;
            Down = false;
        }
        
        if(key.key=='ArrowLeft' | key.key == 'a'){
            Left = true;
            Right = false;
            Up = false;
            Down = false;
            Space = false;
        }
        
        else if(key.key=='ArrowRight' | key.key=='d'){
            Right = true;
            Left = false;
            Up = false;
            Down = false;
            Space = false;
        }
        
        else if(key.key=='ArrowUp' | key.key=='w'){
            Up = true;
            Right = false;
            Down = false;
            Space = false;
            Left = false;
        }
        
        else if(key.key=='ArrowDown' | key.key=='s'){
            Down = true;
            Right = false;
            Up = false;
            Space = false;
            Left = false;
        }
        
        else {
            Left = false;
            Right = false;
            Up = false;
            Down = false;
        }
    }
    
    
    setInterval(checkIfPressed);
    setInterval(checkScene);
