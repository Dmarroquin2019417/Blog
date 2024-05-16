export const PostDescription = ({
    usuario,
    post,
    estilo,
    texto,
}) => {

    return (
        <div className="post-description-container">
            <div className="post-description-title-box">
                <span className="post-description-title">
                    {post}
                </span>
            </div>
            <div className="details-box">
                <div className="post-description-item">
                    <i className="fa-solid fa-user"></i>
                    <span className="post-description">{usuario}</span>
                </div>
                <div className="post-description-item">
                    <i className="fa-solid fa-layer-group"></i>
                    <span className="post-description">{estilo}</span>
                </div>
            </div>
            <div className="post-description-box">
                <div className="post-description-text">
                    <span className="post-description-body">{texto}</span>
                </div>
            </div>
        </div>
    );
};
