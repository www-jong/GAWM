import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Live from "./pages/Live/App.jsx";
import StyleLogSelect from "./pages/Closet/History/styleLogSelect.jsx";
// import VideoRoomComponent from "./pages/Live/VideoRoomComponent.jsx";
import Browse from "./pages/Browse";
import Closet from "./pages/Closet";
import StyleLogAdd from "./pages/Closet/History/styleLogAdd.jsx";
import StyleLogDetail from "./pages/Closet/History/stylelogDetail.jsx";
import StyleLogEdit from "./pages/Closet/History/styleLogEdit.jsx";
import MyPage from "./pages/MyPage";
import Landing from "./pages/Landing";
import Look from "./pages/Look";
import EditLook from "./pages/Look/EditLookBook.jsx";
import Loading from "./pages/Loading";
import AddClothes from "./pages/AddFashion/AddClothes";
import AddLook from "./pages/AddFashion/AddLookBook";
import MyPageMenu from "./pages/MyPage/Menu";
import MyPageSettings from "./pages/MyPage/Settings";
import MyPageBookmark from "./pages/MyPage/Bookmark";
import MyPageSettingsPropertySetter from "./pages/MyPage/Settings/PropertySetter";
import MyPageAccountList from "./pages/MyPage/AccountList";
import EnterLive from "./pages/Live/EnterLive/App.jsx";
import Image from "./pages/AddFashion/ImageEdit.jsx";
import { fetchUserInfo  } from "./stores/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="live" element={<Live />} />
          <Route path="enter" element={<EnterLive />} />
          <Route path="browse" element={<Browse />} />
          <Route path="closet" element={<Closet />} />
          <Route path="mypage" element={<MyPage />}>
            <Route index element={<MyPageMenu />} />
            <Route path="settings">
              <Route index element={<MyPageSettings />} />
              <Route path="nickname" element={<MyPageSettingsPropertySetter />} />
              <Route path="gender" element={<MyPageSettingsPropertySetter />} />
              <Route path="age" element={<MyPageSettingsPropertySetter />} />
            </Route>
            <Route path="bookmark" element={<MyPageBookmark />} />
            <Route path="following" element={<MyPageAccountList />} />
            <Route path="followers" element={<MyPageAccountList />} />
          </Route>
          <Route path="look" element={<Look />} />
          <Route path="look/:lookbookId" element={<Look />} />
          <Route path="look/edit" element={<EditLook />} />
          <Route path="look/edit/:lookbookId" element={<EditLook />} />

          {/* <Route path="/look/:id" element={<Look />} /> */}
        </Route>
        <Route path="closet/add" element={<AddClothes />} />
        <Route path="closet/stylelog-select" element={<StyleLogSelect />} />
        <Route path="closet/stylelog-add" element={<StyleLogAdd />} />
        <Route path="closet/stylelog/:stylelogId" element={<StyleLogDetail />} />
        <Route path="closet/stylelog-edit" element={<StyleLogEdit />} />
        <Route path="image" element={<Image />} />

        <Route path="look/add" element={<AddLook />} />
        <Route path="landing" element={<Landing />} />
        <Route path="loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
