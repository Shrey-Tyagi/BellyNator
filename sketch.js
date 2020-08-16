let video;
let CV;
let posNet;
let noseX = 0;
let noseY = 0;
let Leye_X = 0;
let Leye_Y = 0;
let Reye_X = 0;
let Reye_Y = 0;
let X_Cord = 0;
let Y_Cord = 0;
let Dist;
let flag = 1;
let YCord = 30;
let XCord = 0;
let FL = 0;
let p;
let flg = 0;
let CnTr = 0;
let Squats=0;
let tmp=0;
let PUSHUP=0;
function setup() {
  createCanvas(648, 480);
  video = createCapture(VIDEO);
  video.hide();
  posNet = ml5.poseNet(video);
  posNet.on('pose', gotPoses);
}

function Twister()
{
  if((p.length>0))
     {  
  if(((p[0].pose.keypoints[7].score)>0.2) && ((p[0].pose.keypoints[0].score)>0.2))
  {
     console.log("WOR");
  console.log(p[0].pose.keypoints[7].position.y);
    console.log("BOR");
  console.log(p[0].pose.keypoints[0].position.y);
    if(!CV)
    { if(p[0].pose.keypoints[7].position.y>p[0].pose.keypoints[0].position.y)
    {CV=1;
     }
    }
    if(CV)
 {if(p[0].pose.keypoints[7].position.y<p[0].pose.keypoints[0].position.y)
  {CV=0;
   PUSHUP++;
  } 
 }
}
}
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}

function Dodge() {
  YCord = YCord;
  // console.log('flg');
  // console.log(flg);
  if (!flg) {
    if (XCord < 600) {
      XCord = XCord + 30;
      if (XCord > 550) {
        flg = 1;

      }
    }
  }

  if (flg) {
    XCord = XCord - 20;
    if (XCord < 100) {
      flg = 0;
    }
  }
  // console.log('a');
  // console.log(YCord);
  // console.log(XCord);
}

function CheckHit() {
  if ((dist(X_Cord, Y_Cord, noseX, noseY) < 100) || (dist(X_Cord, Y_Cord, Leye_X, Leye_Y) < 100)) {
    flag = 1;
    CnTr += 50;
    // console.log(CnTr);
  }

  //console.log(dist(X_Cord,Y_Cord,noseX,noseY));
  //console.log(dist(X_Cord,Y_Cord,Leye_X,Leye_Y));
}

function generateTargets() {
  X_Cord = getRndInteger(50, 600);
  Y_Cord = getRndInteger(40, 430);
  // console.log('Targetgenrated');
  // console.log(X_Cord);
  // console.log(Y_Cord);
}


function gotPoses(poses) {
  // console.log(poses);

  // console.log('making sense');
  p = poses;
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[9].position.x;
    let nY = poses[0].pose.keypoints[9].position.y;
    let eXL = poses[0].pose.keypoints[10].position.x;
    let eYL = poses[0].pose.keypoints[10].position.y;
    let eXR = poses[0].pose.keypoints[0].position.x;
    let eYR = poses[0].pose.keypoints[0].position.y;
    Reye_X = eXR;
    Reye_Y = eYR;
    if (poses[0].pose.keypoints[0].score > 0.2) {
     
      if(!tmp)
         {if(Reye_Y>300)
      {tmp=1;
       Squats=Squats+1;
      }}
    if(tmp)
    { if(Reye_Y<300)
    {
      tmp=0;
    }
    }
    }
    if (poses[0].pose.keypoints[9].score > 0.2) {
      noseX = nX
      noseY = nY
    }
    if (poses[0].pose.keypoints[10].score > 0.2) {
      Leye_X = eXL;
      Leye_Y = eYL;

    }
    Dodge();
    dooge();
    Twister();
    if (FL) {
      fill(15, 10, 70);
      console.log('drat');
      YCord = getRndInteger(90, 400);
      XCord = 0;
    }
    //console.log(noseX);
    //console.log(noseY);
    /*ellipse(Leye_X,Leye_Y,50);
    ellipse(Reye_X,Reye_Y,50);
    */
  }
}

function dooge() {
  FL = 0;
  // console.log('capx');
  let pose = p[0].pose;
  for (let j = 0; j < pose.keypoints.length; j++) {
    let keypoint = pose.keypoints[j];
    if (keypoint.score > 0.2) {
      //console.log('cap');  console.log(dist(keypoint.position.x,keypoint.position.y,XCord,YCord));
      if (dist(keypoint.position.x, keypoint.position.y, XCord, YCord) < 50) { //console.log('cap');                console.log(dist(keypoint.position.x,keypoint.position.y,XCord,YCord));
        CnTr = CnTr - 20;
        FL = 1;
        break;
      }
    }
  }
  if (!FL) {
    FL = 0;
  }
}


function draw() {
  background(220);
  image(video, 0, 0);
  fill(255, 0, 0);
  Dist = dist(Leye_X, Leye_Y, Reye_X, Reye_Y);
  Dist = 0.75 * Dist;
  //ellipse(noseX,noseY,40);
  //ellipse(Leye_X,Leye_Y,40);
  fill(0, 255, 0);
  CheckHit();
  textSize(34);
  text(CnTr, 540, 420);
  text(PUSHUP,300,420);
  text(Squats,50,420);
  if (flag) {
    generateTargets();
    flag = 0;
  }

  fill(255, 0, 0);
  ellipse(XCord, YCord, 50);
  fill(0, 255, 0);
  ellipse(X_Cord, Y_Cord, 40);


  //ellipse(Reye_X,Reye_Y,Dist);

}

function modelReady() {
  console.log('ready!');
}