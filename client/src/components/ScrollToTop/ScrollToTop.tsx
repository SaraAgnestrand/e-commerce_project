import { UpCircleOutlined } from "@ant-design/icons";
import './ScrollToTop.css';



const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <UpCircleOutlined className="scroll-to-top-icon" onClick={scrollToTop} />
        </div>
    );
}


export default ScrollToTop