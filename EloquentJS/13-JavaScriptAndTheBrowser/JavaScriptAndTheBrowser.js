/* 📃 Networks and the internet */

/*
    A *network protocol* describes a style of communication over a network.
    There are protocols for sending email, fetching email, sharing files, etc.

    Hypertext Transfer Protocol (HTTP) is a protocol for retrieving named resources(chunks of information, such as web pages or pictures).
    Request should start with a line like this, naming the resource and the version of the protocol that it is trying to use:
    -> GET /index.html HTTP/1.1
    
    Transmission Control Protocol (TCP) is a protocol that allow us to communicate with other computers over the network.
    This work as follows: One computer must be waiting, or listening, for other computers to start talking to it. To be able to listen for different kinds of communications at the same time on a single machin, each listener has a number(called a port) associated with it. Most protocols specify witch port should be used by default.
    
    For example, to send email using SMTP protocol, the machine through which we send it is expected to be listening on port 25.
    Another computer can then establish a connection by connecting to the target machine using the correct port number. If the target machine can be reached and is listening on that port, the connection is successfully created. The listening computer is called the *server* and the connecting computer is called the *client*
    
*/


/* 📃 The web */

/*
    The World Wide Web is a set of protocols and formats allow us to visit web page in a browser.
    To become part of the Web, all you need to do is connect a machine to Internet and have it listen on port 80 with the HTTP protocol so that other computers can ask it for documents.

    Each document on the Web is named by *Uniform Resource Locator* (URL), wich looks something like this:

    -> https://www.google.com/13_browser.html
    |protocol|    server    |     path     |

    1.- Protocol: Which protocol is used.
    2.- Server: Wich server is requesting the document from.
    3.- Path: String that identifies the specific document(or resource) we are interested in.
*/


/* 📃 HTML */

/* 
    HTML, which stands for Hypertext Markup Language, is the document
    format used for web pages. An HTML document contains text, as well
    as tags that give structure to the text, describing things such as links,
    paragraphs, and headings.

    The tags, wrapped in angle brackets ( < and > , the symbols for less
    than and greater than), provide information about the structure of the
    document.

    HTML documents have a head and a body. The head contains information about the document, and the body contains the document itself.

    Some opening tags, contain extra information in the form of *name='value'* pairs. These are called *attributes*
*/

/* 📃 HTML and JavaScript */

/* 
    The <script> tag allows us to include a piece of JavaScript in a document

    -> <script>alert("hello!");</script>

    The tag has a *src* attribute to fetch a script file(a text file containing a JS program) from a URL.

    -> <script src="code/hello.js"></script>
*/
