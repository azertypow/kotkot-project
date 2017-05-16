/**
 * Created by mathi on 15/05/2017.
 */

function voteIsComing(voteDuration) {

    clearLedColor();
    var currentVoteDuration = voteDuration;
    var clearCanvas = true;
    var howManyTimes = 5;

    animationFromCenterToBorder(currentVoteDuration, voteDuration, clearCanvas, howManyTimes);

}