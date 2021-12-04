#include <Arduino_LSM9DS1.h>

const int flexPin0 = A0;
const int flexPin1 = A1;
const int flexPin2 = A2;
const int flexPin3 = A3;

int value0;
int value1;
int value2;
int value3;

void setup() {
  Serial.begin(9600); // Starts the serial communication
  
  if (!IMU.begin()) { //Inertial Measurement Unit -> 가속도계, 회전 속도계
    Serial.println("Failed to initialize IMU!");
    while (1);
  }
}
void loop() {
  float ax, ay, az;
  float gx, gy, gz; 
  // 접을수록 value값 상승 (650 ~ 850)
  value0 = analogRead(flexPin0);         //Read and save analog value from potentiometer
  value1 = analogRead(flexPin1);
  value2 = analogRead(flexPin2);
  value3 = analogRead(flexPin3); 

  if (IMU.accelerationAvailable()&& IMU.gyroscopeAvailable()) {
    IMU.readAcceleration(ax, ay, az);
    IMU.readGyroscope(gx, gy, gz);

    Serial.print(ax);
    Serial.print('\t');
    Serial.print(ay);
    Serial.print('\t');
    Serial.print(az);
    Serial.print('\t');

    Serial.print(gx);
    Serial.print('\t');
    Serial.print(gy);
    Serial.print('\t');
    Serial.print(gz);
    Serial.print('\t');

    Serial.print(value0);
    Serial.print('\t');
    Serial.print(value1);
    Serial.print('\t');
    Serial.print(value2);
    Serial.print('\t');
    Serial.println(value3);
  }  
  delay(10);
}
