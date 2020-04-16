

//% weight=10 color=#DF6721 icon="\uf013" block="micro:Boson"
namespace microBoson {
    const address = 0x10
    /**
     * The user selects the 4-way dc motor.
     */
    export enum Motors {
        M1 = 0x00,
        M2 = 0x01,
        ALL 
    }
    /**
     * The user defines the motor rotation direction.
     */
    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x00,
        //% blockId="CCW" block="CCW"
        CCW = 0x01
    }
    /**
	 * Execute a motor
     * M1~M2.
     * speed(0~255).
    */
    //% weight=90
    //% blockId=motor_motorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=1
    export function motorRun(index: Motors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
        }
        if (index == 1) {
            buf[0] = 0x02;
        }
        if (index == 2) {
            buf[0] = 0x04;
        }
        if (index == 3) {
            buf[0] = 0x06;
        }
        buf[1] = direction;
        buf[2] = speed;
        pins.i2cWriteBuffer(address, buf);
    }
    /**
	 * Stop the dc motor.
    */
    //% weight=20
    //% blockId=motor_motorStop block="Motor stop|%index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function motorStop(index: Motors) {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
        }
        if (index == 1) {
            buf[0] = 0x02;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
        }
        if (index == 2) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(address, buf);
            buf[0] = 0x02;
            pins.i2cWriteBuffer(address, buf);
        }
    }
   
}
