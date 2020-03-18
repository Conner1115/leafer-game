var leafEnergy = 0;
    var lPC = 1;
    var lPS = 0;
    var sPS = 0;
    var time = 0;
    var soldiers = 0;
    var population = [300000,640000000,720000000];
    var armySizes = [soldiers,population[1]/50,population[2]/25];
    var power = [0,population[1]/25,population[2]/10];
    var troops = 0;
    var upgradeArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    var soldierCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var totalEP = population[1]+population[2];
    var energyUpgrades = [
        {
            name:"archanar bush",
            cost:10,
            lps:0,
            lpc:1,
            inc:2,
            d:"a small bush that yields archanar fruit which can be converted into energy.",
        },
        {
            name:"archanar tree",
            cost:50,
            lpc:6,
            lps:0,
            inc:3,
            d:"a fully-grown plant that yields the energy-giving archanar fruit."
        },
        {
            name:"plant yard",
            cost:100,
            lpc:13,
            lps:1,
            inc:3,
            d:"An underground area full of archanar bushes."
        },
        {
            name:"archanar pasture",
            cost:500,
            lpc:24,
            lps:2,
            inc:5,
            d:"a large plot of underground land that is full of energy-yielding plants."
        },
        {
            name:"archanar field",
            cost:1000,
            lpc:60,
            lps:3,
            inc:10,
            d:"The difference between the pasture and the field is that the field is bigger and more densly packed with energy plants."
        },
        {
            name:"archanian magician",
            cost:5000,
            lpc:10,
            lps:10,
            inc:15,
            d:"A powerful leafer magician that increases the growing of archanar plants."
        },
        {
            name:"archanar farm",
            cost:10000,
            lpc:120,
            lps:10,
            inc:19,
            d:"A farm that consists of quite a few fields and pastures of archanar."
        },
        {
            name:"archanian plantation",
            cost:50000,
            lpc:500,
            lps:50,
            inc:50,
            d:"a huge plot of land full of the powerful plant."
        },
        {
            name:"archanar harvesting factory",
            cost:100000,
            lpc:1000,
            lps:100,
            inc:100,
            d:"harvests the archanar plants faster than any amount of leafer avatars can."
        },
        {
            name:"genetic multiplier",
            cost:500000,
            lps:13000,
            lpc:1000,
            inc:500,
            d:"changes the genetics of the fruit so that they will grow faster and will give more power"
        },
        {
            name:"planetary core factory",
            cost:1000000,
            lpc:150000,
            lps:10000,
            inc:NaN,
            d:"this is a factory that yields mass amounts of energy from the earth's core.  Only one of these can be posessed."
        },
        {
            name:"Mutant archane plant",
            cost:10000000,
            lpc:100000,
            lps:50000,
            inc:NaN,
            d:"makes so many archan plants that are genetically modified to give as much power as possible"
        },
        {
            name:"Archanian Wizard",
            cost:100000000,
            lpc:0,
            lps:600000,
            inc:10000,
            d:"The most powerful of all leafer magicians and one of the first to be able to harness the avatar power of plants is the Archanian Wizard.  Only a few exist alive on the avatar planet."
        },
    ];
    var armyUpgrades = [
        {
            name:"basic trooper",
            power:1,//how strong the troop is
            d:"a basic trooper that fights.",
            cost:50,//how much energy it costs to purchase the unit
            sps:0, //how many soldiers per second it spawns
            takeUpC:1,//how many energy per clicks it takes up
            takeUpS:1,//how many energy per second it takes up
            req:["barracks"],//the building(s) needed to make the unit
            
        },
        {
            name:"army trainer",
            power:5,
            d:"trains leafer soldiers to fight and gives you one per second.  buy more of these units for more soldiers.",
            sps:1,
            cost:500,
            req:["barracks"],
            takeUpC:3,
            takeUpS:2,
        },
        {
            name:"warrior",
            power:7,
            d:"a very powerful unit that causes a lot of destruction",
            sps:0,
            cost:250,
            req:["barracks"],
            reqUnit:["army trainer"],//which unit(s) you need to purchase before this one is available
            takeUpC:2,
            takeUpS:2,
        },
        {
            name:"destroyer",
            power:10,
            d:"an extremely powerful unit.",
            cost:350,
            takeUpC:0,
            sps:0,
            takeUpS:3,
            req:["barracks"],
            reqUnit:["army trainer"],
        },
        {
            name:"sergent",
            power:15,
            d:"this guy is very powerful and is important in the battle. also gives you 1 soldier per second.",
            sps:1,
            takeUpC:1,
            takeUpS:2,
            cost:1500,
            req:["barracks"],
            reqUnit:["army trainer"],
        },
        {
            name:"luitenant",
            power:10,
            d:"a very important leafer to have as your soldier. gives you 2 soldiers per second.",
            sps:2,
            cost:750,
            takeUpC:5,
            takeUpS:1,
            req:["barracks"],
            reqUnit:["army trainer"]
        },
        {
            name:"commander",
            power:20,
            d:"a very strong and important unit in battle.  gives you five soldiers per second",
            cost:5000,
            sps:5,
            takeUpC:5,
            takeUpS:5,
            req:["barracks"],
            unitReq:["army trainer"],
        },
        {
            name:"battle mage",
            power:25,
            takeUpC:10,
            takeUpS:15,
            d:"This unit is extremely strong and powerful.  It uses ancient leafer plant magic to battle.",
            cost:50000,
            sps:0,
            req:["barracks","leafer mage chamber"],
        },
        {
            name:"warlock archanoid",
            power:50,
            takeUpC:50,
            takeUpS:25,
            d:"this guy is twice as strong as a battle mage.  They use the most powerful techniques of plant to defeat their foes",
            sps:1,
            cost:1000000,
            req:["barracks"],
            reqUnit:["battle mage"]
        },
        {
            name:"ancient warlock",
            power:75,
            takeUpC:100,
            takeUpS:100,
            d:"Use this unit to demolish your foes quickly.  they can control all plant-based life forms in almost any way.",
            sps:0,
            cost:15000000,
            req:["barracks"],
            reqUnit:["battle mage","warlock archaniod"]
        },
        {
            name:"squad",
            power:11,
            takeUpC:12,
            takeUpS:120,
            d:"ten basic troopers.  nice.",
            cost:500,
            sps:0,
            req:["barracks"],
            reqUnit:["army trainer","basic trooper"]
        },
        {
            name:"troop",
            power:150,
            takeUpC:150,
            takeUpS:1500,
            d:"a hundred basic troopers together can deal quite a bit of damage.",
            cost:5000,
            sps:0,
            req:["barracks"],
            reqUnit:["army trainer","basic trooper"]
        },
        {
            name:"legion",
            power:620,
            takeUpC:650,
            takeUpS:7000,
            d:"Whoa! this group uses up a lot of energy but they're awesome.  five hundred basic troopers.",
            cost:250000,
            sps:0,
            req:["barracks"],
            reqUnit:["army trainer","squad","basic trooper"]
        },
        {
            name:"demolishion squad",
            power:150,
            takeUpC:100,
            takeUpS:100,
            d:"ten warriors = awesomeness",
            cost:10000,
            sps:0,
            req:["barracks"],
            reqUnit:["army trainer"]
        },
        {
            name:"destruction team",
            power:400,
            takeUpC:300,
            takeUpS:300,
            d:"ten destroyers = even more awesomeness",
            cost:500000,
            sps:0,
            req:["barracks"],
            reqUnit:["army trainer"]
        },
        {
            name:"mage group",
            power:750,
            takeUpC:500,
            sps:1,
            takeUpS:500,
            d:"ten mages = maximum awesomeness",
            cost:10000000,
            req:["barracks"],
            reqUnit:["battle mage"]
        },
        {
            name:"titan",
            power:150,
            takeUpC:100,
            takeUpS:100,
            sps:10,
            d:"the most powerful and biggest single unit ever. spawns other units too.",
            cost:100000000,
            req:["barracks","supercharger","leafer mage chamber"],
            reqUnit:["battle mage","army trainer"]
        },
    ];
    
    
    var allowBuyOnClick = function(num){
        $(".u"+num).on("click",function(){
            if(leafEnergy >= energyUpgrades[num].cost){
        upgradeArray[num]+=1;
        $(".itemCount"+num).html(upgradeArray[num]);
        leafEnergy-=energyUpgrades[num].cost;
        energyUpgrades[num].cost+=energyUpgrades[num].inc*energyUpgrades[num].inc;
        energyUpgrades[num].inc++;
        $(".cost"+num).html(energyUpgrades[num].cost);
        lPC += energyUpgrades[num].lpc;
        lPS += energyUpgrades[num].lps;
            }
            
    });
    }
    for(var i = 0; i < energyUpgrades.length; i++){
        $("#shop1").append("<div class = 'energyUG u"+i+"'><h3>"+energyUpgrades[i].name+"</h3><div><p>Cost: <span class = 'cost"+i+"'>"+(energyUpgrades[i].cost)+"</span>, Energy Per Click: "+energyUpgrades[i].lpc+", Energy Per Second: "+energyUpgrades[i].lps+"</p><br><p>"+energyUpgrades[i].d+"<br><br>You have <span class = 'itemCount"+i+"'>0</span> of these</p></div></div>");
        allowBuyOnClick(i);
        
    }
    var allowArmyPurchase = function(num){
        
      $(".a"+num).on("click",function(){
          if(leafEnergy >= armyUpgrades[num].cost&&lPC >= armyUpgrades[num].takeUpC&&lPS >= armyUpgrades[num].takeUpS){
              soldierCount[num]++;
              $("#counta"+num).html(soldierCount[num]);
                  leafEnergy-=armyUpgrades[num].cost;
                  lPC -= armyUpgrades[num].takeUpC;
                  lPS -= armyUpgrades[num].takeUpS;
                  soldiers++;
                  armySizes[0]++;
                  power[0]+=armyUpgrades[num].power;
                  sPS+=armyUpgrades[num].sps;
                  
          }
      });  
    };
    for(var i = 0; i < armyUpgrades.length; i++){
        
        $("#armyUpgrades").append("<div class = 'armyUG a"+i+"'><h3 style = 'text-align:center'>"+armyUpgrades[i].name+"</h3><p>"+armyUpgrades[i].d+"<br><br>Costs: <ul style = 'margin-left:15%'><li>"+armyUpgrades[i].cost+" Leaf Energy<li> "+armyUpgrades[i].takeUpC+" Energy Per Click<li> "+armyUpgrades[i].takeUpS+" Energy Per Second</ul></p><p><div style = 'margin-left:20%' >You have <span id = 'counta"+i+"'>0</span> of this unit</div></p></div>")
        
        allowArmyPurchase(i);
    }
    
    
    
    var showPage = function(tag){
        $(".page").hide();
        $(tag).fadeIn("fast");
    }
    showPage("#Menu");
    $("#start-button").on("click",function(){
        showPage("#Story");
    });
    $("#next-button-1").on("click",function(){
        showPage("#Story1");
    });
    $(".return-button").on("click",function(){
        showPage("#Game");
    })
    $("#enemyStats").on("click",function(){
        showPage("#EnemyStats");
    });
    $("#energy-upgrades").on("click",function(){
        showPage("#Shop1");
    });
    $("#stat-button").on("click",function(){
        showPage("#Stats");
    });
    $("#army-upgrades").on("click",function(){
        showPage("#Shop2");
    });
    $("#attack").on("click",function(){
        showPage("#Battlefield");
    });
    $("#destroy").on("click",function(){
        if(power[0] % 2 === 0){
        population[1]-=power[0];
            power[0]+=1;
            population[1]-=power[0];
            power[0] = 0;
            soldiers = 0;
        }else{
            power[0]+=1;
            population[1]-=power[0];
            soldiers = 0;
            power[0] = 0;
        }
        armySizes[0]=0;
        if(population[1]+population[2] <= 10000){
            showPage("#Win")
        }
    });
    $("#leaf-button").on("mousedown",function(){
        $("#leaf-button").css({
            top:260+"px",
            boxShadow:"none",
        })
    }).on("mouseup",function(){
        $("#leaf-button").css({
            top:250+"px",
            boxShadow:"0px 10px 0px 0px rgb(6, 112, 9)",
        })
    }).on("click",function(){
        $("#leafEnergy").html(leafEnergy);
        leafEnergy+=lPC;
    });
    
    //updates your stuff every second (energy per second)
    setInterval(function(){
        $("#leafEnergy").html(leafEnergy);
        leafEnergy+=lPS;
        $("#time").html(time);
        time++;
        $("#soldiers").html(soldiers);
        soldiers+=sPS;
        power[0]+=sPS;
    },1000);
    setInterval(function(){
        $("#lP").html(population[0]);
        $("#sP").html(population[1]);
        $("#pP").html(population[2]);
        population[0]+=1;
        population[1]+=2;
        population[2]+=2;
    },1500)
    setInterval(function(){
        $("#sp").html(population[1]);
        $("#pp").html(population[2]);
        power[1]+=2;
        power[2]+=3;
    },7500)
    //updates your stuff every ten frames (in case you buy something or do an action that changes your stuff)
    setInterval(function(){
        $("#sPS").html(sPS)
        $("#leafEnergy").html(leafEnergy);
        $("#soldiers").html(soldiers);
        $("#troops").html(troops);
        $("#epc").html(lPC);
        $("#eps").html(lPS);
        $("#numLE").html(leafEnergy);
        $("#sps").html(sPS);
        $("#lp").html(power[0]);
        $("#sp").html(power[1]);
        $("#pp").html(power[2]);
        $("#ed").html(power[2]+power[1]);
        $("#attackDamage").html(power[0]);
        $("#aT").html(armySizes[0]);
        $("#lP").html(population[0]);
        $("#sP").html(population[1]);
        $("#pP").html(population[2]);
        $("#las").html(armySizes[0]);
        $("#sas").html(armySizes[1]);
        $("#pas").html(armySizes[2]);
        $("#ep").html(population[1]+population[2])
        if(leafEnergy >= maxEnergy){
            leafEnergy = maxEnergy;
        }
    },10);
    /*What is the setInterval function?*/
    /**
    *The setInterval is literally the draw function you see every day in your processing.js editor.  what's inside of the setinterval function is what should be inside of your draw function.'
    **/
