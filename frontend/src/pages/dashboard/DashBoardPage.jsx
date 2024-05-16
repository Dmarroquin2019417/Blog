
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { usePosts } from "../../shared/hooks";
import { useUserDetails } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {
    const { getPosts, allPosts, isFetching: isPostsFetching } = usePosts();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getPosts(isLogged);
    }, []);

    if (isPostsFetching) {
        return <LoadingSpinner />;
    }


    return (
        <div className="dashboard-container">
            <Navbar />
            <Content posts={allPosts || []} getPosts={getPosts} />
        </div>
    );
};

