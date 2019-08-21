// shane cunningham 25/4/2017
// sketch detects motion from movement and OSC sends the values to Pure Data


import processing.video.*;
Capture video;
PImage prev;


float threshold = 25;

float motionX = 0;
float motionY = 0;

float lerpX = 0;
float lerpY = 0;

import oscP5.*;
import netP5.*;
  
OscP5 oscP5;
NetAddress puredata;




void setup(){
  size(640, 480);
  
  String[] cameras = Capture.list();
  printArray(cameras);
     
   video = new Capture(this, cameras[1]);
  
  video.start();        // begin web cam
  prev = createImage(640, 480, RGB);   //  creates an image of video
  
  
  oscP5 = new OscP5(this,12000);
  
  puredata = new NetAddress("127.0.0.1",8000); 

  }
  
//allows  reading of previous frame
  void captureEvent(Capture video) {
    // makes a copy from previous frame to track
    prev.copy(video, 0, 0, video.width, video.height ,0, 0, prev.width, prev.height);
    prev.updatePixels();
    //reading image from camera
    video.read();
  
}

void draw() {
 
  video.loadPixels();
  prev.loadPixels();
  image(video, 640, 480);
 // rect(mouseX, mouseY, 20,20);
  
  threshold = 80;
  
  int count = 0; 
 
  float avgX = 0;
  float avgY = 0;
  
   
  
  loadPixels();
  // begin loop to walk through every pixel
  for (int x = 0; x < video.width; x++ ) {
      for (int y = 0; y < video.height; y++ )   {
        int loc = x + y * video.width;
        // what is the current color
        color currentColor = video.pixels[loc];
        float r1 = red(currentColor);
        float g1 = green (currentColor);
        float b1 = blue(currentColor);
        color prevColor = prev.pixels[loc];
        float r2 = red(prevColor);
        float g2 = green (prevColor);
        float b2 = blue(prevColor);
       
        
        float d = distSq(r1, g1, b1, r2, g2, b2);
      
        
        if (d > threshold*threshold) {
          stroke(255);
          strokeWeight(1);
          point(x,Y);
          avgX += x;
          avgY += y;
          count++;
        
         pixels[loc] = color(255);
        } else {
          pixels[loc] = color(0);
        
       }

    }
 }
 updatePixels();
  
    if (count > 0) {
      motionX = avgX / count;
      motionY = avgY / count;
       OscMessage msg = new OscMessage("/motion");
       msg.add(motionY);
       msg.add(motionX);
       oscP5.send(msg, puredata);
      // Draw  a  circle at the tracked pixel
    }
    
    lerpX =lerp(lerpX, motionX, 0.1);  // lerp interpolates between the two values
    lerpY =lerp(lerpY, motionY, 0.1);
OscMessage msg = new OscMessage("/lerp");
       msg.add(lerpY);
       msg.add(lerpX);
       oscP5.send(msg, puredata);   
  
    
    
    
    fill(255, 0, 0);
      strokeWeight(2.0);
      stroke(0);
      ellipse(lerpX, lerpY, 10, 10);
      
      //image(video, 0, 0, 100, 100);
  //image(prev, 100, 0, 100, 100);

  //println(mouseX, threshold);
    
  }
        
  float distSq(float x1, float y1, float z1, float x2, float y2, float z2){
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);   
  return d;  // Returns data from captured frame
  
  }
   
  