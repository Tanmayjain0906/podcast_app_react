//components
import Navbar from "./components/Navbar"
import Singup from "./pages/Singup"
import Profile from "./pages/Profile"
import PrivateRoutes from "./components/PrivateRoutes"
import CreateAPodcast from "./pages/CreateAPodcast"
import PodcastPage from "./pages/PodcastPage"
import PodcastDetailsPage from "./pages/PodcastDetailsPage"
import CreateAnEpisode from "./pages/CreateAnEpisode"


//hooks
import { useEffect } from "react"
import { useDispatch } from "react-redux"


//react-router-dom
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"


//firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, onSnapshot } from "firebase/firestore"


//react-tostifying
import { ToastContainer, toast } from 'react-toastify';


//css
import "./style.css"
import 'react-toastify/dist/ReactToastify.css';


//slices
import { setUser } from "./slices/userSlice"




function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapShot = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser({
              uid: user.uid,
              name: userData.name,
              email: userData.email,
              profile: userData.profile,
            }))
          }
        }, (err) => {
          alert(err)
        });

        return () => {
          unSubscribeSnapShot()
        }
      }
    })

    return () => {
      unSubscribeAuth()
    }
  }, [])
  return (
    <div className="main">
      <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-podcast" element={<CreateAPodcast />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route path="/podcast/:id/create-episodes" element={<CreateAnEpisode />} />
          </Route>
        </Routes> 
    </div>
  )
}

export default App
