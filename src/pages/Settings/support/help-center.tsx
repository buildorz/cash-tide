import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import {
  Search,
  ChevronRight,
  HelpCircle,
  ShieldQuestion,
  CreditCard,
  Send,
  DollarSign,
  MessageSquare,
  Phone,
  ArrowRight,
  Mail,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: <HelpCircle size={16} /> },
    { id: "account", name: "Account", icon: <ShieldQuestion size={16} /> },
    { id: "payments", name: "Payments", icon: <CreditCard size={16} /> },
    { id: "transfers", name: "Transfers", icon: <Send size={16} /> },
    { id: "fees", name: "Fees", icon: <DollarSign size={16} /> },
  ];

  const faqs: FAQ[] = [
    {
      id: "faq1",
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login screen and tap on 'Forgot password'. Follow the instructions sent to your email to create a new password.",
      category: "account",
    },
    {
      id: "faq2",
      question: "How do I add a new payment method?",
      answer:
        "Go to Settings > Payment Methods and tap 'Add New Card'. Enter your card details and save to add a new payment method to your account.",
      category: "payments",
    },
    {
      id: "faq3",
      question: "What are the transfer limits?",
      answer:
        "Standard accounts can transfer up to $5,000 per day and $20,000 per month. Premium accounts have higher limits of $10,000 per day and $50,000 per month.",
      category: "transfers",
    },
    {
      id: "faq4",
      question: "Are there fees for international transfers?",
      answer:
        "Yes, international transfers incur a fee of 1% of the transfer amount (minimum $1.50, maximum $20). Premium users get reduced fees of 0.5%.",
      category: "fees",
    },
    {
      id: "faq5",
      question: "How do I change my phone number?",
      answer:
        "Phone numbers can only be changed by contacting customer support with verification of your identity.",
      category: "account",
    },
    {
      id: "faq6",
      question: "How long do transfers take?",
      answer:
        "Domestic transfers typically complete within minutes. International transfers can take 1-5 business days depending on the destination country.",
      category: "transfers",
    },
    {
      id: "faq7",
      question: "What happens if my payment fails?",
      answer:
        "If a payment fails, you'll receive a notification with the reason. You can try again with another payment method or after resolving the issue with your card.",
      category: "payments",
    },
    {
      id: "faq8",
      question: "Is there a fee for adding funds to my wallet?",
      answer:
        "Adding funds via bank transfer is free. Adding funds via credit card incurs a 2% fee (waived for premium users).",
      category: "fees",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const contactMethods = [
    {
      icon: <MessageSquare />,
      title: "Live Chat",
      description: "Chat with our support team",
      badge: "24/7",
      action: () => toast.success("Connecting to live chat..."),
    },
    {
      icon: <Mail />,
      title: "Email Support",
      description: "Get help via email",
      badge: "24-48 hours",
      action: () => toast.success("Email support form opened"),
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      description: "Call our support team",
      badge: "Business hours",
      action: () => toast.success("Calling support center..."),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Help Center" showBackButton />

      <div className="space-y-5 sm:space-y-6 md:space-y-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className="flex-shrink-0"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="ml-1">{category.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium mb-3">
            Frequently Asked Questions
          </h3>

          {filteredFaqs.length > 0 ? (
            <Card>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0 text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="font-medium text-lg mb-1">No Results Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We couldn't find any help articles matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset search
              </Button>
            </Card>
          )}
        </motion.div>

        <Separator className="my-4" />

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-medium mb-3">Contact Support</h3>

          <Card>
            <div className="divide-y divide-border">
              {contactMethods.map((method, index) => (
                <button
                  key={method.title}
                  className="w-full text-left p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                  onClick={method.action}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {method.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{method.title}</h4>
                        <Badge
                          variant="outline"
                          className="font-normal text-xs"
                        >
                          {method.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Help Guides */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Help Guides</h3>
            <Button variant="ghost" size="sm" className="text-xs">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="p-3 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="font-medium mb-1 text-sm">
                Getting Started Guide
              </div>
              <p className="text-xs text-muted-foreground">
                Learn the basics of using Cash Tide
              </p>
            </Card>

            <Card className="p-3 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="font-medium mb-1 text-sm">
                Security Best Practices
              </div>
              <p className="text-xs text-muted-foreground">
                Keep your account safe and secure
              </p>
            </Card>

            <Card className="p-3 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="font-medium mb-1 text-sm">
                International Transfers
              </div>
              <p className="text-xs text-muted-foreground">
                How to send money internationally
              </p>
            </Card>

            <Card className="p-3 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="font-medium mb-1 text-sm">
                Troubleshooting Payments
              </div>
              <p className="text-xs text-muted-foreground">
                Resolve common payment issues
              </p>
            </Card>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default HelpCenter;
