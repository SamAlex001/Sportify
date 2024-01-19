import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";

export const EditPost = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/posts/viewpost/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, []);

    async function updatePost(e) {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('category', category);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        const response = await fetch('http://localhost:4000/posts/updatepost', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            navigate('/post/' + id);
            alert('Post Updated Sucessfully')
        }
    }

    return (
        <div>
            <Link to={'/'}><button>Go Home</button></Link>
            <br /><br />
            <form onSubmit={updatePost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input type="summary"
                    placeholder={'Summary'}
                    value={summary}
                    onChange={(e) => { setSummary(e.target.value) }} />
                <br /><br />
                {/* <input type="category"
                    placeholder={'Category'}
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }} />
                <br /><br /> */}
                <input type="file"
                    onChange={(e) => { setFiles(e.target.files) }} />
                <br /><br />
                <Editor onChange={setContent} value={content} />
                <button>Update Post</button>
            </form>
        </div >
    )
}