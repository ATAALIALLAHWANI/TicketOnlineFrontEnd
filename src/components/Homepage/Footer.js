import "./FooterStyles.css";

const Footer=()=>{
return(
    <div className="footer">
        <div className="top">
          <div>
<h1>Just Go</h1>
<p>Reserve Your Ticket and pay online</p>
</div>
<div>
    <a href="/">
        <i className="fa-brands fa-facebook-square"></i>
    </a>

    <a href="/">
        <i className="fa-brands fa-instagram-square"></i>
    </a>

    <a href="/">
        <i className="fa-brands fa-behance-square"></i>
    </a>
    <a href="/">
        <i className="fa-brands fa-twitter-square"></i>
    </a>
</div>
</div>
<div className="bottom">
 <div>
<h4>Services</h4>
<a href="/">Reserve Ticket</a>
<a href="/">pay-online</a>
<a href="/">Scan-ticket by Scanner</a>
<a href="/">all version</a>
</div>
<div>
<h4>Community</h4>
<a href="/">Status</a>
<a href="/">Licence</a>
<a href="/">changelog</a>

</div>

  <div>
<h4>help</h4>
<a href="/">Support</a>
<a href="/">Contact us</a>
<a href="/">Help CENTER</a>
     </div>

 <div>
<h4> other</h4>
<a href="/">Term of Services</a>
<a href="/">Licence</a>
<a href="/">privacy policy</a>
 </div>
        </div>
    </div>
)
}
export default Footer;