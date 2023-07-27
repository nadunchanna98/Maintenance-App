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
  const addminwork = `Take charge of coordinating and overseeing all maintenance tasks within the campus.

Prioritize tasks based on urgency and importance, ensuring that resources are allocated efficiently.
  
Maintain clear and open communication with laborers, supervisors, and other relevant personnel.
  
Regularly update them on maintenance schedules, changes, and any important information.
  
Oversee the work of laborers to ensure they are following instructions and adhering to safety guidelines.
  
Conduct periodic quality checks to ensure that maintenance tasks are completed to the required standards.
  
Actively engage with users of the app to understand their maintenance needs and concerns.
  
Respond promptly to user feedback and address any reported issues or complaints.
  
Ensure the app is updated and maintained regularly to provide a seamless user experience.
  
Fix any bugs or glitches promptly to prevent disruptions for users.
  
Efficiently manage resources, including manpower, tools, and materials, to optimize maintenance operations.
  
Monitor resource utilization to minimize waste and improve cost-effectiveness.
  
Provide training and development opportunities for laborers to enhance their skills and knowledge.
  
Encourage continuous improvement and professional growth among maintenance staff.
  
Prioritize safety in all maintenance activities, ensuring that laborers follow safety protocols and wear appropriate PPE.
  
Regularly assess and improve safety measures to reduce the risk of accidents.
  
Maintain comprehensive records of maintenance tasks, user interactions, and app updates.
  
Use data to analyze trends, identify areas for improvement, and make data-driven decisions.
  
Work closely with other departments or stakeholders to address maintenance needs and ensure smooth operations across the campus.
  
Encourage a culture of continuous improvement and innovation within the maintenance team.
  
Seek feedback from laborers and users to identify opportunities for enhancements.
  
Prioritize customer service by being attentive to user needs and providing timely and satisfactory solutions.`;

  const addminbenifite = `Streamlined Maintenance Operations: By coordinating and prioritizing tasks effectively, the admin can ensure that maintenance operations run smoothly and efficiently.

Improved Resource Allocation: Efficiently managing resources leads to cost savings and optimal utilization of manpower, tools, and materials.
  
Enhanced User Satisfaction: Engaging with users and promptly addressing their concerns improves user satisfaction with the app and maintenance services.
  
Higher App Reliability: Regular app maintenance and prompt bug fixes lead to a more reliable and seamless user experience.
  
Reduced Downtime: Effective oversight and quality checks result in faster task completion and reduced downtime for campus facilities.
  
Safety and Compliance: Prioritizing safety measures and compliance reduces the risk of accidents and ensures a safer work environment for laborers and users.
  
Informed Decision-making: Data-driven decisions based on comprehensive records help the admin identify trends and make informed improvements.
  
Professional Growth: Providing training and development opportunities fosters professional growth among laborers and enhances their skills.
  
Positive Workplace Culture: A focus on continuous improvement and innovation creates a positive and motivated workplace culture among the maintenance team.
  
Effective Collaboration: Working closely with other departments fosters better collaboration and communication for addressing maintenance needs.
  
Improved Reputation: Efficient maintenance and excellent user interaction contribute to a positive reputation for the admin and the maintenance office.
  
Higher User Retention: Satisfactory user experiences lead to higher user retention and increased usage of the app for maintenance requests.
  
Optimized Maintenance Planning: Prioritizing tasks based on urgency allows the admin to plan maintenance activities more effectively.
  
Enhanced App Performance: Regular app updates and bug fixes lead to better app performance and user satisfaction.
  
Cost-Effective Operations: Proper resource management and reduced downtime result in cost-effective maintenance operations.
  
Efficient Troubleshooting: Promptly addressing user feedback and issues ensures quick resolution and a more efficient troubleshooting process.
  
Proactive Maintenance: Data analysis and trend identification allow the admin to be proactive in addressing recurring issues and improving services.
  
Customer Loyalty: Satisfying user needs and providing excellent service fosters customer loyalty and trust in the maintenance office.
  
Increased Efficiency: Careful work practices and oversight result in increased efficiency and productivity among laborers.
  
Positive Impact on Campus: By effectively managing maintenance, the admin contributes to a positive and well-maintained campus environment`;

  const supervisework = `Lead by Example: Demonstrate a commitment to safety and careful work practices as a supervisor, following all guidelines and wearing appropriate safety gear during tasks.

Effective Communication: Clearly communicate tasks to laborers, providing detailed instructions and ensuring they fully understand the requirements. Emphasize the importance of working carefully and efficiently to achieve quality results.
  
Regular Training: Provide ongoing training to laborers on safe and proper work techniques for different tasks. Keep them updated on any changes in guidelines or procedures.
  
Supervise Closely: Regularly supervise laborers during their work to ensure they are following instructions and safety protocols. Offer guidance and feedback to help improve their skills and promote careful work practices.
  
Identify and Address Hazards: Conduct thorough risk assessments for various tasks to identify potential hazards. Implement necessary measures to mitigate risks and ensure a safe working environment.
  
Encourage a Safety Culture: Foster an atmosphere where safety is a top priority. Encourage laborers to report any safety concerns or incidents promptly.
  
Allocate Time Wisely: Avoid rushing laborers in their tasks, allowing them sufficient time to complete tasks carefully and efficiently. Rushing can lead to mistakes and compromise safety.
  
Monitor Equipment: Regularly inspect and maintain tools and equipment used by laborers to ensure they are in good working condition. Malfunctioning equipment can pose safety risks.
  
Provide Proper Tools and Equipment: Ensure laborers have access to the appropriate tools and equipment needed for their tasks. Using the right tools promotes careful and efficient work.
  
Support and Motivate: Provide support to laborers, addressing any concerns they may have. Motivate them to take pride in their work and strive for excellence.
  
Foster Teamwork: Encourage laborers to work collaboratively, supporting and assisting each other when necessary. Teamwork promotes a positive and cooperative work environment.
  
Recognize and Reward Careful Work: Acknowledge and appreciate laborers who consistently demonstrate careful work practices. Recognition boosts morale and encourages others to follow suit.
  
Address Performance Issues: If any laborer is not meeting expectations, address performance issues promptly and provide the necessary support or training to improve their work.
  
  Monitor Progress: Keep track of completed tasks and ongoing projects. Use records to identify areas for improvement and plan for future maintenance tasks.`;
  const supervisebenifit = `Enhanced Safety Culture: By leading by example and emphasizing safety, supervisors create a safety-conscious culture within the workplace. This reduces the risk of accidents and injuries, promoting a safer work environment.

Improved Work Quality: Careful work practices ensure that tasks are performed accurately and efficiently, resulting in higher-quality output and reduced errors.
  
Increased Productivity: With effective oversight and guidance, laborers can work more efficiently, completing tasks in a timely manner and maximizing productivity.
  
Better Resource Management: Careful work practices lead to reduced material wastage and equipment damage, resulting in cost savings and improved resource management.
  
Employee Satisfaction: A supportive and safety-focused work environment fosters positive morale among laborers, leading to higher job satisfaction and reduced turnover rates.
  
Enhanced Professionalism: Effective supervision and careful work practices contribute to a more professional and organized workplace, benefiting the overall reputation of the maintenance office.
  
Improved Task Allocation: Supervisors who closely monitor progress can allocate tasks more effectively, ensuring the right skills are utilized for specific `;
  const labourwork = `Address urgent repairs and safety hazards promptly to prevent accidents or further damage.

Develop a maintenance schedule for regular tasks like grass cutting or equipment checks, planning in advance for timely completion.
  
Assign tasks based on each laborer's skills and expertise to maximize productivity and quality.
  
Be adaptable and flexible to accommodate unexpected maintenance requests or emergencies, adjusting the work schedule accordingly.
  
Create a long-term maintenance plan to address larger projects or renovations over time, budgeting and planning in advance to avoid delays.`;

  const labourguidelince = `Emphasize the importance of safety in all tasks, ensuring laborers wear appropriate personal protective equipment (PPE) when necessary and provide proper training on tool operation and handling hazardous materials.

Clearly communicate the assigned tasks to each laborer, detailing what needs to be fixed, maintained, or cleaned, and prioritize urgent issues to be addressed promptly.

When introducing new tasks or techniques, demonstrate proper methods to laborers, encouraging questions and clarifications to prevent mistakes.

Regularly supervise laborers during their work to ensure adherence to instructions and safety guidelines, and provide constructive feedback to enhance performance.

Help laborers manage their time effectively by setting reasonable task timeframes, avoiding rushed work that compromises quality and safety.

Inspect completed tasks to ensure they meet required quality standards, addressing areas for improvement with the laborers if necessary.

Instruct laborers on proper tool and equipment maintenance, scheduling regular checks to ensure all equipment is in good working condition.

Foster teamwork and cooperation among laborers to support each other on significant projects, promoting a positive work environment for increased productivity and morale.

Maintain records of completed tasks and any issues arising during maintenance work, using the records for progress tracking and identifying recurring problems.`;

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
  const addminworkArray = addminwork.split("\n\n");
  const addminbenifiteArray = addminbenifite.split("\n\n");
  const superviseworkArray = supervisework.split("\n\n");
  const supervisebenifitArray = supervisebenifit.split("\n\n");
  const labourguidlineArray = labourguidelince.split("\n\n");
  const labourworkArray = labourwork.split("\n\n");
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
                {addminworkArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {addminbenifiteArray.map((guideline, index) => (
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
                {superviseworkArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  Key Benefits and Future Protection Strategies in Universities
                </Text>
                {supervisebenifitArray.map((guideline, index) => (
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
                {labourguidlineArray.map((guideline, index) => (
                  <View key={index} style={styles.guidelineContainer}>
                    <Text style={styles.guidelines}>{guideline}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.cardText}>
                  For managing workloads and priorities
                </Text>
                {labourworkArray.map((guideline, index) => (
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
    marginRight: 10,
    padding: 10,
    backgroundColor: "#D1C6C8",
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
