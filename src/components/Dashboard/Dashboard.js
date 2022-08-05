import React, { Component } from "react";
import "../../styles/Dashboard/Dashboard.css";
import dummyImage from "../images/4.jpg";
import dummyImage1 from "../images/5.jpg";
import dummyImage2 from "../images/6.jpg";
import { ActionIcon, Tabs, Button } from "@mantine/core";
import {
  IconDownload,
  IconSettings,
  IconListDetails,
  IconStar,
} from "@tabler/icons";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <h4 className="title-line">Dashboard</h4>
        <Tabs defaultValue="purchased-items">
          <Tabs.List>
            <Tabs.Tab value="purchased-items" icon={<IconStar size={14} />}>
              Purchased Items
            </Tabs.Tab>
            <Tabs.Tab value="billing-info" icon={<IconListDetails size={14} />}>
              Billing Info
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="purchased-items" pt="xs">
            <div className="items-container">
              <div className="item">
                <img src={dummyImage} alt="dummy1" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage1} alt="dummy2" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage2} alt="dummy3" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage2} alt="dummy3" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage} alt="dummy1" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage1} alt="dummy2" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage2} alt="dummy3" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>

              <div className="item">
                <img src={dummyImage2} alt="dummy3" />
                <ActionIcon variant="filled" className="download-icon">
                  <IconDownload />
                </ActionIcon>
              </div>
            </div>
            <Button
              radius="xs"
              style={{ marginTop: "1rem", backgroundColor: "#5fa372" }}
            >
              DOWNLOAD ALL
            </Button>
          </Tabs.Panel>

          <Tabs.Panel value="billing-info" pt="xs">
            Billing tab content
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
