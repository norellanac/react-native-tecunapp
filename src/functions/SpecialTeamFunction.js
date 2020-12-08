import { React } from 'react';
import { awardReducer } from '../reducers/awardReducer';
import { awardAction } from '../actions/awardActions';


export function pathImage() {
    awardReducer.awards.map((award) => {
      console.log("Awards: ", award)
    })
}