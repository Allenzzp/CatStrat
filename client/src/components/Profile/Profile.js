import React from 'react'
import "./profile.scss"
import coin from "../../images/imgC.png"
import Upvotes from '@mui/icons-material/ThumbUp';
import Downvotes from '@mui/icons-material/ThumbDown';
import Trophy from '@mui/icons-material/EmojiEvents';
import {useState, useEffect} from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {useNavigate, useParams} from 'react-router-dom'
import Axios from "axios";
import PieChart from './PieChart2';
import { FcDown, FcUp } from "react-icons/fc";
import classNames from 'classnames'

import 'devextreme/dist/css/dx.material.blue.dark.css';
import { ProgressBar } from 'devextreme-react/progress-bar';



const Profile = () => {
  const navigate = useNavigate();

  // const [loginID, setLoginID] = useState("")
  const [getData, setGetData] = useState("");
  const [stratData, setStratData] = useState([]);
  const [graphData, setGraphData] = useState([])
  const [editProfile, setEditProfile] = useState(false)
  const [follow, setFollow] = useState(false)
  const [removeFollow, setRemoveFollow] = useState(false)
  const [unfollow, setUnfollow] = useState(true)
  const [showFollow, setShowFollow] = useState(false);
  const [showPurchase, setShowPurchase] = useState(true);
  const [showStrat, setShowStrat] = useState(false);

  const [bought, setBought] = useState(false)
  const [addLike, setAddLike] = useState(false)
  const userID = localStorage.getItem("userID")
  const params = useParams()
  const id = params.id

  const graphClass = classNames("graph-chart", {
    "graph-chart--bought": bought,
  })

  useEffect(() => {
    const userID = localStorage.getItem("userID")

    Promise.all([
      Axios.get(`/profile/${id}}`, {params: {id}}),
      Axios.get(`http://localhost:8080/dashboard`, { params: { user_id: userID } }),
      Axios.get("/strategies", {}),
    ]).then((all) => {
      
      setGetData(all[0].data[0]);
      console.log("all0", all[0].data)
      setGraphData(all[1].data)
      console.log("all1", all[1].data)
      setStratData(all[2].data)
      console.log("all2", all[2].data)

      console.log(userID, id)
      if (userID === id) {
        setShowPurchase(true)
        setBought(true)
        setShowStrat(true)
      }
      if (userID !== id) {
        setShowFollow(true)
      } else {
        setShowFollow(false)
      }
      if (parseInt(userID) !== parseInt(id) && removeFollow === false) {
        setFollow(true)
        setUnfollow(false)
      } else {
        setFollow(false)
        setUnfollow(true)
      }
      if (userID == id) {
        setEditProfile(true)
      }
    }).catch(err => console.log(err))

  }, [removeFollow, id, bought, addLike])

  const purchase = () => {
    setBought(true);
  }

  const followUser = () => {
    console.log("clicked")
    const userID = localStorage.getItem("userID")
  
    Axios.post("/following", {userID, id})
      .then(res => {
        console.log("followed success!", res.data)
        if (res.data.added === true) {
          setRemoveFollow(true)
        }
      })
      .catch(err => console.log(err));
  }
  
  const unfollowUser = () => {
    console.log("clicked")
    const userID = localStorage.getItem("userID")
  
    Axios.post("/unfollow", {userID, id})
      .then(res => {
        console.log("unfollowed success!")
        if (res.data.added === false) {
          setRemoveFollow(false)
        }
      })
      .catch(err => console.log(err));
  }
  
  const like = () => {
    console.log("clicked")
  
    Axios.post("/like", {id})
      .then(res => {
        console.log("success!")
        setAddLike(!addLike)
      })
      .catch(err => console.log(err));
  }
  
  const dislike = () => {
    console.log("clicked")
  
    Axios.post("/dislike", {id})
      .then(res => {
        console.log("success!")
        setAddLike(!addLike)
      })
      .catch(err => console.log(err));
  }
  
  const upvote = (item_id) => {
    console.log("clicked")
  
    Axios.post(`/strategy/${item_id}`)
      .then(res => {
        console.log("did you trigger?")
        setAddLike(!addLike)
      })
      .catch(err => console.log(err))
  }

  const purchaseStrat = () => {
    setShowStrat(true);
  }

  const navigateCompare = (id) => {
    navigate(`/comparison/${id}`)
  }

  return (
    <div className="profile-container">
      <div className="profile-container-side">
        <img src={getData.avatar_url} className="avatar" alt="avatar"/>
        <div className="profile-social">
          <p className="icons-s"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarOutlineIcon/></p>
          <p className="icons-i"><FaFacebook className="fb1"/>facebook/Catstreetbets</p>
          <p className="icons-i"><FaInstagram className="fb1"/>instagram/Catstreetbets</p>
          <p className="icons-i"><FaTwitter className="fb1"/>Twitter/Catstreetbets</p>
          {/* <p className="icons-i"><FaLinkedin />LinkedIn/Catstreetbets</p> */}
          <p className="icons-i"><img className="catecoin" src={coin} alt="catecoin"/>X100</p>
          <p className="icons-t"><Trophy className="icons-t-inside"/>X1</p>
        </div>
      </div>
      <div className="profile-container-main">
        <div className="profile-about">
          <div className="user-profile">
            <div className="profile-separator">
              <div className="follow-btn">
                <div className="profile-username">{getData.username}<VerifiedIcon/></div>
                {follow && <Button id="compare-id" size="small" variant="contained" onClick={() => {navigateCompare(id)}}>Compare</Button>}
                {showFollow ? <>{follow === true ? <Button size="small" variant="contained" onClick={followUser}>Follow</Button> : <Button size="small" variant="contained" onClick={unfollowUser} >Unfollow</Button>}</> : <></> }
              </div>
              <div>
                <div className="last-online">Last Online: 2 hours ago</div>
              </div>
            </div>
            <div className="follow-separator">
              <div className="f-number">
                <div className="follow-number">{getData.followers}</div>
                <div className="profile-followers">followers</div>
              </div>
              <div className="f-text">
                <div className="follow-number">{getData.following}</div>
                <div className="profile-followings">followings</div>
              </div>
            </div>
          </div>
          <div className="stock-profile">
            {editProfile && <Button id="edit-btn" size="small" variant="contained">Edit</Button>}
            <div className="progress" >
            <div className="profit-goal"></div>
              <h4 className="profit-goal-text">{`Profit Goal: $ ${getData.profit_goal}`}</h4>
              <ProgressBar
                min={0}
                max={100}
                value={(parseInt(getData.profit) / getData.profit_goal) * 100}
                width={340}
                height={0}
              />
            <div className="votes">
              <div className="up"><Upvotes onClick={like}/>{`${getData.likes}`}</div>
              <div className="down"><Downvotes onClick={dislike}/>{getData.dislikes}</div>
            </div>
            </div>
          </div>
        </div> 
        <div className="profile-graph">
          <div className="graph1">
            <div className={graphClass}><PieChart id="graph-chart" data={graphData}/></div>
           {bought ? <></> : <Button className="graph1-btn" variant="contained" size="small" onClick={purchase}>Purchase</Button>}
          </div>
          <div className="graph2">
            <div className="table-container">
              <tr className="table-columns">
                <th className="one-a">Strategy Name</th>
                <th className="one-b">Description</th>
                <th className="one-c"><Upvotes /></th>
                <th className="one-d"><Downvotes /></th>
              </tr>
              {showStrat ? 
              <>{stratData.map((item) => {
                return (<div className="table-rows-content">
                <tr className="table-rows">
                  <td className="one">{item.strategy_name}</td>
                  <td className="two">{item.description}</td>
                  <td className="three" onClick={() => {upvote(item.id)}}>{item.upvotes}<FcUp /></td>
                  <td className="four">{item.downvotes}<FcDown/></td>
                </tr></div>)
              })}</>
              :
              <><div className="g2-container"><Button id="g2-btn" variant="contained" size="small" onClick={purchaseStrat}>Purchase</Button></div></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile