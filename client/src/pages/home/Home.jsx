import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Access a world of freelance talent with just a few clicks.</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Premium services without the premium price tag
            </div>
            <p>
            Discover premium services at a range of price points, with transparent project-based pricing instead of hourly rates.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Deliver top-notch work with speed and efficiency.
            </div>
            <p>
            Efficiently connect with the perfect freelancer for your project in a matter of minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Guaranteed protected payments
            </div>
            <p>
            Rest assured with transparent pricing. Your payment is held securely until you confirm satisfaction with the completed work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Access support anytime, day or night.
            </div>
            <p>
            Discover exceptional services tailored to your budget with transparent project-based pricing, no hourly rates.
            </p>
          </div>
          <div className="item">
          <video src="./img/video.mp4" controls autoPlay muted/>
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>We've got what you need</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://cdn3.iconfinder.com/data/icons/illustricon-tech/512/development.desktop-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Web Development</span>
            </div>
            <div className="item">
              <img
                src="https://cdn2.iconfinder.com/data/icons/isuite/512/CSS-Edit.png"
                alt=""
              />
              <div className="line"></div>

              <span>Web Design</span>
            </div>
            <div className="item">
              <img
                src="https://cdn3.iconfinder.com/data/icons/digital-nomad-dazzle-vol-2/256/Virtual_Assistant-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Virtual Assistant</span>
            </div>
            <div className="item">
              <img
                src="https://cdn4.iconfinder.com/data/icons/camping-and-adventure-without-backround-set-1/300/34-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
            <div className="item">
              <img
                src="https://cdn3.iconfinder.com/data/icons/social-media-management-soft-fill/60/Social-Media-Manager-management-socials-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Social media manager</span>
            </div>
            <div className="item">
              <img
                src="https://cdn3.iconfinder.com/data/icons/seo-filled-outline-1/512/20_search_head_seo_black_white_specialist_promotion-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>SEO specialist</span>
            </div>
            <div className="item">
              <img
                src="https://cdn4.iconfinder.com/data/icons/back-to-school-152/512/online-education-internet-home-learning-tutor-videocall-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Online tutor</span>
            </div>
            <div className="item">
              <img
                src="https://cdn2.iconfinder.com/data/icons/event-management-soft-fill/60/Event-Planner-Female-planning-person-avatar-user-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Event planner</span>
            </div>
            <div className="item">
              <img
                src="https://cdn1.iconfinder.com/data/icons/developer-6/64/24_application_app_phone_code_development_developer_programmer-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Mobile app development</span>
            </div>
            <div className="item">
              <img
                src="https://cdn3.iconfinder.com/data/icons/big-data-57/64/data-scientist-analyst-expert-programmer-64.png"
                alt=""
              />
              <div className="line"></div>
              <span>Data analyst</span>
            </div>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Origin Swift <i>business</i>
            </h1>
            <h1>
              A solution built for<i>business</i>
            </h1>
            <p>
            Enhance your experience with curated tools and exclusive benefits tailored for businesses.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect with seasoned freelancers with a strong business acumen.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Match with top talent through a dedicated manager.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Enhance team collaboration and productivity with a unified workspace.
            </div>
            <button>Explore Origin Swift Business</button>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
