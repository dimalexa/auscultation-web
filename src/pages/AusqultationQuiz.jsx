import Player from "./components/Player";
import HamburgerMenu from "./components/Menu";
import '../styles/general.css';
import mitral from '../data/audio/mr.mp3';
import tricuspid from '../data/audio/vsd.mp3';
import aortic from '../data/audio/as-early.mp3';
import pulmonary from '../data/audio/ps.mp3';

export default function AuscultationQuiz(){
    const data = [
        {'mitral': mitral,'tricuspid': tricuspid,'aortic': aortic, 'pulmonary': pulmonary},  
    ];

    return (
        <div> 
            <HamburgerMenu />
            <div className="general-block">
                <Player data={data} />
            </div>
        </div>);
}