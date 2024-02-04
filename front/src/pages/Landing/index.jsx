import SocialKakao from './SocialKakao.jsx';
import SocialGoogle from './SocialGoogle.jsx';
import landImage1 from '../../assets/images/LandingPage_1.svg';


export default function Landing() {
    return (
        <div className="h-screen">
            <div style={{ height: '70vh' }} >
                <img src={landImage1} alt="랜딩이미지1" className="flex justify-center items-center" />
            </div>
            <div className="flex flex-col justify-center items-center gap-4" style={{ height: '30vh' }} >
                <SocialKakao />
                <SocialGoogle />
            </div>
        </div>
    );
}