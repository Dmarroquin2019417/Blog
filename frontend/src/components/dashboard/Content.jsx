import { Route, Routes } from "react-router-dom";
import { Settings } from "../settings/Settings";
import { Posts } from "../publicaciones/Posts";
import { PostView } from '../publicaciones/PostView'
import { NewPost } from "../publicaciones/NewPost";

export const Content = ({posts, getPosts, newPost}) => {
    return(
        <div className="content-container">
            <Routes>
                <Route path="settings" element={<Settings/>}/>
                <Route path="/" element={<Posts posts={posts}/>}/>
                <Route path="post/:id" element={<PostView getPosts={getPosts}/>}/>
                <Route path="newPost" element={<NewPost/>}/>
            </Routes>
        </div>
    )
}   