const header = () => {
    return `
        <div id="container1">
            <div id="navbar">
                <div>
                    <p><span>Username</span>'s organization</p>


                    <p>Owner <button>UPGRADE</button></p>
                </div>
                <div>
                    <form action="/search" method="GET">

                        <input type="text" id="search" placeholder="Search...">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                    <a href="#"> What's new</a>
                    <div id="logo"><span id="fn">K</span><span id="ln">B</span></div>
                </div>
            </div>
        </div>
    `
}


module.exports = {
    header
}