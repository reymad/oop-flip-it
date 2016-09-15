const TIME =  1000;// 1 seg
/* objeto */
var Elem = function(props){

    // configuracion objeto
    var self = this;
    this.id  = props.id || Math.random();
    this.acertada = false;
    this.conf  = {
        id: props.data_id,
        frontBg: props.fbg || 'red',
        backBg:  props.bbg || 'silver',
    }
    this.persona = {
        nombre: (props.isFoto) ? (props.nombre || null) : null,
    }
    // empiezan parados
    this.isOn     = false;// si true está funcionando por intervalo
    this.switched = false;
    this.interval = null;
    this.flipMe = function(){

        console.log(self.switched);
        if(self.switched==true) return;
        if(GAME.checkeando==true) return;

        found = document.getElementById(this.id);
        if(found){
            numFlipped++;
            found.classList.toggle('hover');
            if(!self.switched) self.switched = true;// switched true es mostrando front, false es mostrando back
            if(numFlipped==1){ lastSwitched = self; }
            if(numFlipped==2){
                GAME.checkeando=true;
                actualSwitched = self;
                // para adivinar persona
                /*
                 // persona game
                 var name = prompt('Please enter your name','Poppy');
                 if (name.toLowerCase().trim() == self.persona.nombre.toLowerCase().trim()) {}
                 */
                setTimeout( function(){
                    self.acertada = GAME.checkTry();
                    GAME.checkeando=false;
                } , 800);

            }// fin if flipped 2
        }
    }
    this.unFlip = function(){
        found = document.getElementById(this.id);
        if(found){
            found.classList.toggle('hover');
            self.switched = false;// switched true es mostrando front, false es mostrando back
            console.log('unflip switched ' +this.switched)
            this.acertada = false;
        }
    }
    // crear elemento
    this._html = function(){

        var divWrap     =  document.createElement("div");
        divWrap.id  =  this.id,
            divWrap.className = 'flip-container';

        var flipper =  document.createElement("div");
        flipper.className = 'flipper';

        var _front       =  document.createElement("div");
        _front.style.background   =  this.conf.frontBg;
        _front.className = 'front pointer';
        // _front.innerHTML = 'front of ' + this.conf.id;

        var _back       =  document.createElement("div");
        _back.style.background   = this.conf.backBg;
        if(this.persona.nombre!=null){
            _back.style.backgroundImage  = "url('"+this.conf.backBg+"')";// foto
            _back.style.backgroundSize = "100%";// foto
            _back.style.backgroundRepeat = 'no-repeat';
        }
        _back.className = 'back';
        // _back.innerHTML = 'back of ' + this.conf.id;

        flipper.appendChild(_front);
        flipper.appendChild(_back);
        divWrap.appendChild(flipper);

        divWrap.addEventListener("click", this.flipMe , false);

        return divWrap;

    }

}// fin object

Elem.prototype.getId = function(){
    return this.id;
};
// kill flip
Elem.prototype.killFlip = function(){
    clearInterval(this.interval);
    this.off;
};
Elem.prototype.on  = function(){
    this.isOn = true;
};
Elem.prototype.off = function(){
    this.isOn = false;
};
Elem.prototype.getIsSwitch = function(){
    return this.switched;
};
// flip interval
Elem.prototype.flipItv = function(time){

    var self = this;// scope
    this.interval = setInterval( function(){ self.flipMe() } , time);
    this.on;
};

var numFlipped  = 0;
var lastSwitched = {};
var actualSwitched = {};
var countSuccess = 0;

var fichas = [
    { id:Math.random().toString(36).substr(2), data_id: 'a', isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/434099902818582530/guGjbKkI_bigger.jpeg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'b', isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/1399834557/chinoesp_bigger.jpg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'c', isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/612970961969786880/ZHMvnqm3_bigger.jpg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'd', isFoto: false, fbg:'aqua', bbg: 'green', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'e', isFoto: false, fbg:'aqua', bbg: 'red', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'f', isFoto: false, fbg:'aqua', bbg: 'yellow', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'bomba', isFoto: true, fbg:'aqua', bbg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCAefEuTfwkVSEiqPghW_cYq5Cy6INOKRCsposbeevPHROc5RR3beQxw', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'gato', isFoto: true, fbg:'aqua', bbg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFW7Md3D4IVnCmhdGYQgn86ukdYFlw-2zWcNWR1Nstg8Zu8wrn', nombre: Math.random().toString(36).substr(2) },
    // repe
    { id:Math.random().toString(36).substr(2), data_id: 'a',  isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/434099902818582530/guGjbKkI_bigger.jpeg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'b',  isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/1399834557/chinoesp_bigger.jpg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'c',  isFoto: true, fbg:'aqua', bbg: 'https://pbs.twimg.com/profile_images/612970961969786880/ZHMvnqm3_bigger.jpg', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'd',  isFoto: false, fbg:'aqua', bbg: 'green', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'e',  isFoto: false, fbg:'aqua', bbg: 'red', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'f',  isFoto: false, fbg:'aqua', bbg: 'yellow', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'bomba',  isFoto: true, fbg:'aqua', bbg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCAefEuTfwkVSEiqPghW_cYq5Cy6INOKRCsposbeevPHROc5RR3beQxw', nombre: Math.random().toString(36).substr(2) },
    { id:Math.random().toString(36).substr(2), data_id: 'gato',  isFoto: true, fbg:'aqua', bbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAflBMVEX+/v4gHh4AAAAUEREdGxttbGwPCwurqqpiYWGGhoYYFRX09PQHAAD39/caGBgTERG3t7dzcnLg4ODl5eXMzMzs7Ox6eXkvLS3Z2dlSUVHHx8eMi4udnZ29vb2CgYGYl5c3NjYrKSlBPz+npqZFQ0M3NTWamZlUU1NlZGQkIyMH1CEuAAAETElEQVR4nO3a63qiOhQG4LIIkUI4eEDQqli1dbz/G9wmBDlPZ/Z0xDjf+6sFypMsVhZJ6MsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwC/KtvOxmzC2JRF9jt2IcW3JsizKxm7GqKbRNQb8bexmjMqxZQxex27GqBADxEBCDMoYPEtNDIIvr+g5pmLA9j/cuvzLWz2g2cZNLXY5LOOB1vvxdH9hVnrOF80TKgYWsxto9feb/M0WZxIeuwo5iVe/e4G/I7JDeYXHiTWechGDNlrfrfHfY0pe1XrGKW5fEBNntSsETapzAzGYtO/x0OYWb7af0a55xZJY+wrndnIgBrM79+KPzCjUHbsqe9Ao81Pq9lHcBnwRA4+aNvfvyP+X2EUIbLLT1NI5z7zaiPf1OLCJOKdy2IgyE1QMPHfSYNYSalWUdXLXshTOch6plKjFIBFMPejpeu778/isB0Y54s2fHxxVnofhrYz7Z/K85lhwiTFxuA3wteUVYSveH8bPE4NQPtTQSmrH8tOpuSUSTO1oWfvd36sg6H4bH4MJ/VIRb80gE1sNB1JHjY/BSj5Rkf/un8VF6NQ8wvQY+FQ9z59zmqmSykSwf6gzhsdgIWNgO/0nP93q5xM1c+VNTatI/mh6DFROi4H5jEOpLpXBgbcu2hYJJM8/RQyGpvZv3JPbxbP5wrItOjbOLYoYyKmQEz1BDIby4PqsGXE58b0OftoWB9e71ek83cRVDHZyWETTu7X5u6nHOdT+oL5MKD4gTN6Je6FnC6oOboScMFl3bPX3SuhW2nqoLC9jkLwEx0tr/UhyO2VdpYSZTnLBNLTIy2qJYE+WXnsFXcTAV8sJ2+2/hwE2VX3vSuqDQUTtCOgY6MVze+OlZzPqQRUP0fuoz5I2h4PuT8++QU8MFro41HfP4jRcGTM6ctUB++P29TxwKAz169L1fhoCHYMXVy+/qyH1SiGLBrLrAaVqCyWkNxWF+SeXrzpd5tdfJIIuhPNyRyE9zvwgyTYX0Tc6HlemO8DpctiHJIp9JLsYHEfiQ/1XvdSLiFjHKhTEudD3MCgG14etix0Lw85+YrKjqNv3WwzKe+Q9CeNF5pTFa01r7Qwzqs18fWdwQLDL7apjuTF7w9+NKQdSsqr3gHHRTOI3MRADXttcyj4aUfDIMe1r2/ZwnQOr70wR0a6dw+/dmUExFLb1q+IDCf0pStCp9UHOCFm+Spl32TtxdxTn/YnQWSNkG3dveSxd5cZMDTp8vz9/Z/0VgfdNsQPfoEr4Ow7tglfkwfvY7bqnbSsRivrAhtabzyjZVS9PJjdVmJwz2M2S+NyyarLIyVvGM7keIHL/pX/QPeqpYki0LF95861R39b/3GQZyTFwMmf+/xfMiMTuH3vwHZlp/10EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9/MfCJ4q4BNH+UoAAAAASUVORK5CYII=', nombre: Math.random().toString(36).substr(2) },
];

var GAME = {
    obj_fichas: [],
    fichas_creadas: [],
    second : 1000,
    gameTime : 1000*60*1,
    seconds : 0,
    intevalo: null,
    gameOver: false,
    start : function(d){

        console.log('deployed');

        var d = d || document.getElementById('board');

        // Random
        for(var I=0; I<fichas.length; I++){

            var creada = false;
            while (!creada && I<fichas.length) {
                var creaFichaN = Math.floor(Math.random() * (fichas.length)) + 0 ;
                console.log('bucleando');
                if(this.fichas_creadas.indexOf(creaFichaN)==-1){// existe ya?
                    // NO SE HA CREADO AÚN
                    this.obj_fichas.push(new Elem(fichas[creaFichaN]));
                    this.fichas_creadas.push(creaFichaN);
                    creada = true;
                }
            }

        }// fin random

        for(j=0; j<this.obj_fichas.length;j++){
            d.appendChild(this.obj_fichas[j]._html());
        }

        this.setCounter();

    },
    restart: function(){
        // reset
        countSuccess = 0;
        numFlipped   = 0;
        lastSwitched = {};
        actualSwitched = {};
        this.obj_fichas = [];
        this.fichas_creadas = [];
        $('#mask').hide();
        $('#counter').html('¡¡VAMOS!!');
        $('#board,#message').html('');
        $('#countSuccess').html('0');
        // start
        this.start();
    },
    clearInt: function(){
        clearInterval(this.intervalo);
    },
    setCounter: function(){

        var self = this;
        this.seconds = toSeconds(this.gameTime);
        this.intervalo = setInterval( function(){

                if(self.seconds==0){
                    self.forceLose('GAME OVER');
                }else{
                    document.getElementById('counter').innerHTML = 'Quedan ' + self.seconds--  + ' segundos';
                }

            }
            , this.second );

    },
    forceLose: function(msg){
        document.getElementById('counter').innerHTML = 'Quedan ' + this.seconds-- + ' segundos';
        this.clearInt();
        document.getElementById('mask').style.display = 'block';
        alert(msg);
    },
    success : function(){
        countSuccess++;
        this.message('<h3 style="color:green;">ACERTASTE</h3>')
        document.getElementById('countSuccess').innerHTML = countSuccess;
        if(countSuccess==(GAME.obj_fichas.length/2)-1){// -1 por la bomba
            document.getElementById('mask').style.display = 'block';
            this.clearInt();
            alert('GANASTE!!');
        }
    },
    fail : function(){
        this.message('<h3 style="color:red;">FALLASTE</h3>')
        this.resetTry();
    },
    resetTry : function(){
        lastSwitched.unFlip();
        actualSwitched.unFlip();
    },
    checkTry : function(){

        console.log(lastSwitched)
        console.log(actualSwitched);
        if(lastSwitched.conf.id == actualSwitched.conf.id && actualSwitched.conf.id=='bomba'){// bomba death
            this.forceLose('GAME OVER, ¡¡Evita la bomba!!');
        }
        else if(lastSwitched.conf.id == actualSwitched.conf.id)
        {
            console.log('ok');
            lastSwitched.acertada = true;
            actualSwitched.acertada = true;
            this.success();
        }else{
            console.log('fail');
            this.fail();
        }
        numFlipped = 0;
        GAME.checkeando = false;

    },
    message : function(msg){
        document.getElementById('message').innerHTML = msg;
    }

};

function toSeconds(par){
    return parseInt(par/1000>>0);
}

function isAJavascripter(){
    var arr = ['Javascript'];
    return !!~arr.indexOf('Javascript') ? 1 : ~1 ;
}

/* init */
(function(d,t){

    d.getElementById('total').innerHTML = (fichas.length/2)-1;// -1 por la bomba
    GAME.start(d.getElementById('board'));

}(document, TIME));
