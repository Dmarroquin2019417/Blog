import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePostDetails, useNewComment } from "../../shared/hooks";

export const PostView = ({ getPosts }) => {
    const { isFetching, getPostsDetails, postDetails } = usePostDetails();

    const { comment, isLoading, comments } = useNewComment();

    const { id } = useParams()

    console.log('Comments:', comments);

    useEffect(() => {
        getPostsDetails(id)
    }, [])

   
}