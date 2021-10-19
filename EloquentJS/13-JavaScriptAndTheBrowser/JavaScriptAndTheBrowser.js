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
