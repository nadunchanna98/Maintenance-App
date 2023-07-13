import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
const { height, width } = Dimensions.get("window");
import { AuthContext } from "../../src/Context/AuthContext";

const Instruction = () => {
  const { userInfo } = useContext(AuthContext);
  const userguidelines = ` 
The term "common property" typically refers to resources or facilities that are shared and accessible to all members of a community or organization, including universities. In the context of a university, common property often includes things like libraries, study areas, computer labs, sports facilities, and common spaces. Here are some general guidelines on how to use the common property of a university effectively:
  
  1. Familiarize yourself with the available resources: Take some time to explore the university campus and become acquainted with the common property facilities. Locate the library, computer labs, study areas, sports facilities, and any other relevant spaces or resources.
  
  2. Understand the rules and regulations: Each university may have its own set of rules and regulations regarding the use of common property. It's important to familiarize yourself with these guidelines to ensure that you use the facilities appropriately and don't violate any policies.
  
  3. Respect shared spaces: When using common areas such as libraries or study spaces, be considerate of others. Keep noise levels to a minimum, clean up after yourself, and follow any specific rules or guidelines for those spaces. Remember, these areas are meant for everyone's use, so it's important to create a conducive environment for studying and collaboration.
  
  4. Utilize library resources effectively: Libraries are often a valuable resource at universities. Take advantage of the library's collection of books, journals, and other materials for your academic pursuits. Familiarize yourself with the library's catalog and learn how to locate and borrow materials effectively.
  
  5. Follow computer lab guidelines: If your university has computer labs, adhere to the rules and guidelines for using these facilities. Be mindful of time limits if they are in place, don't install unauthorized software, and respect the lab's policies regarding internet usage and printing.
  
  6. Take care of equipment: When using common property resources that involve equipment, such as sports facilities or computer labs, handle the equipment with care and follow any usage guidelines. Report any damages or malfunctions promptly to the appropriate authorities.
  
  7. Engage in community activities: Universities often organize events, workshops, and activities that take place in common areas. Participate in these events to enrich your university experience, engage with fellow students, and make the most of the shared spaces available to you.
  
  
  `;
  const userbenifite = `Protecting common property within a university brings several benefits and contributes to the long-term sustainability and effectiveness of the institution. Here are some reasons why it is important to protect and maintain common property:

  Resource Availability: Common property, such as libraries, study areas, and sports facilities, provide essential resources for students, faculty, and staff. By protecting these resources, universities ensure their availability for present and future members of the community. It allows everyone to access the facilities and maximize their educational and personal development opportunities.
  
  Academic Success: Well-maintained and properly utilized common property contributes to a conducive learning environment. Libraries with extensive collections, advanced technology in computer labs, and comfortable study areas enhance the academic experience. Protecting these resources ensures that students have the necessary tools and spaces to succeed in their studies.
  
  Collaboration and Networking: Common spaces often foster collaboration and interaction among students and faculty. By maintaining these areas and encouraging their proper use, universities facilitate teamwork, knowledge sharing, and the building of professional networks. These interactions can lead to innovative ideas, research collaborations, and supportive academic communities.
  
  Community Engagement: Common property plays a crucial role in creating a sense of community within a university. By protecting and promoting the use of shared spaces, universities encourage students to engage with one another, participate in extracurricular activities, and foster a vibrant campus culture. This sense of community enhances the overall university experience and contributes to personal growth and social connections.
  
  Sustainable Practices: Protecting common property aligns with sustainable practices. By maintaining and efficiently utilizing resources, universities can reduce waste, conserve energy, and minimize their environmental impact. This proactive approach to sustainability contributes to the institution's reputation, attracts environmentally conscious students and faculty, and aligns with global efforts to promote sustainability.
  
  Long-Term Cost Savings: Regular maintenance and protection of common property can help prevent major repairs or replacements in the future. By addressing issues promptly, universities can avoid costly infrastructure problems and ensure the longevity of their facilities. This approach leads to more efficient use of resources and financial savings in the long run.
  
  
  
  
  `;

  const guidelineArray = userguidelines.split("\n\n");
  const userbenifiteArray = userbenifite.split("\n\n");

  return (
    <>
      {userInfo.role === "admin" ? (
        <SafeAreaView>
          {/* <View style={styles.dashboardHeader}>
            <Text style={[styles.headerText, styles.title]}>Instruction</Text>
          </View> */}
          <ScrollView style={{ height: "95%" }}>
            <View style={styles.imageSection}>
              {/* <Text>Image</Text> */}
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View>
                <Text style={styles.cardText}>
                  Guidelines for Effective Usage
                </Text>
                {guidelineArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {userbenifiteArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : userInfo.role === "supervisor" ? (
        <SafeAreaView>
          {/* <View style={styles.dashboardHeader}>
            <Text style={[styles.headerText, styles.title]}>Instruction</Text>
          </View> */}
          <ScrollView style={{ height: "95%" }}>
            <View style={styles.imageSection}>
              {/* <Text>Image</Text> */}
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View>
                <Text style={styles.cardText}>
                  Guidelines for Effective Usage
                </Text>
                {guidelineArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {userbenifiteArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : userInfo.role === "labour" ? (
        <SafeAreaView>
          {/* <View style={styles.dashboardHeader}>
            <Text style={[styles.headerText, styles.title]}>Instruction</Text>
          </View> */}
          <ScrollView style={{ height: "95%" }}>
            <View style={styles.imageSection}>
              {/* <Text>Image</Text> */}
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View>
                <Text style={styles.cardText}>
                  Guidelines for Effective Usage
                </Text>
                {guidelineArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {userbenifiteArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          {/* <View style={styles.dashboardHeader}>
            <Text style={[styles.headerText, styles.title]}>Instruction</Text>
          </View> */}
          <ScrollView style={{ height: "95%" }}>
            <View style={styles.imageSection}>
              {/* <Text>Image</Text> */}
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View>
                <Text style={styles.cardText}>
                  Guidelines for Effective Usage
                </Text>
                {guidelineArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {userbenifiteArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: "#ffffff",
    fontSize: width * 0.045,
    marginRight: width * 0.02,
  },
  dashboardHeader: {
    backgroundColor: "#19AFE2",
    minHeight: width * 0.16,
    padding: width * 0.04,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 5,
  },
  imageSection: {
    backgroundColor: "#98E2FB", // Light blue: "#98E2FB"   Dark blue: "#19AFE2"
    width: "100%",
    height: "10%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textSection: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 10,
    flex: 1,
  },
  cardText: {
    // backgroundColor: "black",
    color: "black",
    fontWeight: "bold",
    fontSize: width * 0.045,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "justify",
  },
  content: {
    color: "black",
    fontSize: width * 0.045,
    marginTop: 10,
    lineHeight: 24,
    marginRight: 10,
  },
  guidelineContainer: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  guidelines: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    marginRight: 10,
  },
});

export default Instruction;
