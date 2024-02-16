import React from "react";
import { useUserStore } from "../../stores/user";

// 고차 컴포넌트
export default function withUserStore(Component) {
  return function WrappedComponent(props) {
    const userStore = useUserStore(); // 사용자 정보 가져오기
    return <Component {...props} user={userStore.user} />;
  };
}
