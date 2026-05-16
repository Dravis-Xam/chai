import chaiLight from "../assets/chai_logo_light.png";
import chaiDark from "../assets/chai_logo_dark.png";
import React from 'react'

export default function Footer() {
  return (
    <>
      <div>
        <div id="detail_sect" className='f-sections'>
          <div class="title">
            <h2>Chai</h2>
            <img alt="logo" id="logo" src={chaiLight}></img>
          </div>
          <div id="details_exp">
            <p id="detail_content"></p>
            <div id="detail_location">
              <h4>Find us</h4>
              <p></p>
              <a href="+254790269182">+254 7 90 269 182</a>
            </div>
          </div>
          <div id="FAQs">
            <div id="question_1" className="question-card dropdown-container">
              <h4 id="question"></h4>
              <p id="answer"></p>
              <div id="comment-sect" className="dropdown-contaier">
                <div id="comment_1">
                  <div className="user_badge">
                    <img src="" alt="user_profile_icon" id="<user>_profile_icon"></img>
                    <span><small>Username</small></span>
                  </div>
                  <div className="user_message">
                    <p id="user_message"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="nav_sect" className='f-sections'>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Cart</li>
            <li>About</li>
            <li>Blog</li>
          </ul>
        </div>
        <div id="legal_sect" className='f-sections'>
          <div id="contact_dropdown" className="dropdown-container">
            <span className="dropdown-title">Contacts</span>
            <ul>
              <li id="Gmail"><span className="cont_icon_cont"><img src={""} alt="Gmail icon"></img></span>
                Email: <a href="mailto: kennedyngo1234@gmail.com">
                  kennedyngo1234@gmail.com
                </a>
              </li>
              <li id="Contact_phone_1"><span className="cont_icon_cont"><img src={""} alt="Contact icon"></img></span>
                Phone: <a href="+254790269182">+254 7 90 269 182</a>
              </li>
              <li id="Contact_phone_2"><span className="cont_icon_cont"><img src={""} alt="Contact icon"></img></span>
                Phone: <a href="+254754234198">+254 7 54 234 198</a>
              </li>
              <li id="whatsapp"><span className="cont_icon_cont"><img src={""} alt="Whatsapp icon"></img></span>
                Phone: <a href="+254790269182">+254 7 90 269 182</a>
              </li>
              <li id="messages"><span className="cont_icon_cont"><img src={""} alt="Messages icon"></img></span>
                Phone: <a href="+254790269182">+254 7 90 269 182</a>
              </li>
            </ul>
          </div>
          <div>Privacy </div>
          <div>Organization</div>
          <div>Leadership</div>
          <div>Markets</div>
        </div>
      </div>
      <div id="basebar">
        <p>2025 @ copyright . Terms and Conditions apply</p>
      </div>
    </>
  )
}
