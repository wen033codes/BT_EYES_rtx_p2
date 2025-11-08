bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    basic.clearScreen()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    keyboard.sendString(keyboard.keys(keyboard._Key.tab))
    basic.showLeds(`
        . # . . #
        . . # . #
        # # # # #
        . . # . #
        . # . . #
        `)
})
input.onLogoEvent(TouchButtonEvent.Released, function () {
    keyboard.sendString(keyboard.keys(keyboard._Key.enter))
    basic.showLeds(`
        . . # . #
        . # . . #
        # # # # #
        . # . . .
        . . # . .
        `)
})
input.onButtonPressed(Button.B, function () {
    keyboard.sendString("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.tab))
    basic.showLeds(`
        # . . # .
        # . # . .
        # # # # #
        # . # . .
        # . . # .
        `)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    Clicks()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, function () {
    Clicks()
})
function Clicks () {
    actTime = input.runningTime()
    if (count == 0 || lastTime - actTime <= Limits && !(PressHold)) {
        count += 1
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    lastTime = input.runningTime()
}
let Limits = 0
let PressHold = false
let lastTime = 0
let actTime = 0
let count = 0
keyboard.startKeyboardService()
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Resistive)
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate115200
)
count = 0
actTime = 0
lastTime = 0
PressHold = false
Limits = 700
music.play(music.createSoundExpression(WaveShape.Sine, 5000, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
for (let index = 0; index < 2; index++) {
    basic.showIcon(IconNames.SmallHeart)
    basic.showIcon(IconNames.Heart)
}
basic.forever(function () {
    if (input.runningTime() - lastTime > Limits && count > 0) {
        PressHold = true
        if (count == 2) {
            keyboard.sendString(keyboard.keys(keyboard._Key.tab))
            basic.showLeds(`
                . # . . #
                . . # . #
                # # # # #
                . . # . #
                . # . . #
                `)
        } else if (count == 3) {
            keyboard.sendString("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.tab))
            basic.showLeds(`
                # . . # .
                # . # . .
                # # # # #
                # . # . .
                # . . # .
                `)
        } else if (count == 4) {
            keyboard.sendString(keyboard.keys(keyboard._Key.enter))
            basic.showLeds(`
                . . # . #
                . # . . #
                # # # # #
                . # . . .
                . . # . .
                `)
        } else {
            basic.clearScreen()
        }
        count = 0
    } else {
        PressHold = false
    }
})
