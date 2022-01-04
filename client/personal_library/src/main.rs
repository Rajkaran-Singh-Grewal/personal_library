use stenographer;
fn main() {
    let mut logger = stenographer::logger::initializeLogger(String::from("./log.json")); 
    logger.log("Hello, world!");
}
