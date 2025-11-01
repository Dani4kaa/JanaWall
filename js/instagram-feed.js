document.addEventListener('DOMContentLoaded', () => {
  const instaContainer = document.getElementById('insta-container');

  // Token laden
  fetch('js/token.json')
    .then(response => response.json())
    .then(data => {
      const token = data.access_token;

      // Instagram Feed abrufen
      fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${token}`)
        .then(res => res.json())
        .then(feedData => {
          feedData.data.forEach(post => {
            if(post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
              const link = document.createElement('a');
              link.href = post.permalink;
              link.target = '_blank';
              const img = document.createElement('img');
              img.src = post.media_url;
              img.alt = post.caption || 'Instagram Bild';
              link.appendChild(img);
              instaContainer.appendChild(link);
            }
          });
        })
        .catch(err => console.error('Fehler beim Abrufen des Instagram-Feeds:', err));
    })
    .catch(err => console.error('Fehler beim Laden des Tokens:', err));
});
