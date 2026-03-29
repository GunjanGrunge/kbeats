import requests
import sys
import json
from datetime import datetime
import time

class KBeatsAPITester:
    def __init__(self, base_url="https://audio-canvas-40.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test-session-{int(time.time())}-{hash(str(datetime.now())) % 10000}"

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        if data:
            print(f"   Data: {json.dumps(data, indent=2)}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout (30s)")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_send_chat_message(self, message="Hello, I need help with music production for my vlog"):
        """Test sending a chat message"""
        success, response = self.run_test(
            "Send Chat Message",
            "POST",
            "chat/message",
            200,
            data={
                "session_id": self.session_id,
                "message": message
            }
        )
        return success, response

    def test_get_chat_history(self):
        """Test getting chat history"""
        return self.run_test(
            "Get Chat History",
            "GET",
            f"chat/history/{self.session_id}",
            200
        )

    def test_update_inquiry(self):
        """Test updating inquiry information"""
        return self.run_test(
            "Update Inquiry Info",
            "POST",
            f"chat/inquiry/{self.session_id}/update?name=Test User&email=test@example.com&project_type=vlog",
            200
        )

    def test_multiple_messages(self):
        """Test multiple message conversation"""
        messages = [
            "I need music for my wedding video",
            "What styles do you offer?",
            "How long does production take?"
        ]
        
        all_success = True
        for i, message in enumerate(messages):
            print(f"\n--- Message {i+1} ---")
            success, response = self.test_send_chat_message(message)
            if not success:
                all_success = False
            time.sleep(2)  # Wait for AI response processing
        
        return all_success

def main():
    print("🎵 K Beats API Testing Suite")
    print("=" * 50)
    
    tester = KBeatsAPITester()
    
    # Test 1: Root endpoint
    print("\n📍 Testing Basic Connectivity...")
    root_success, _ = tester.test_root_endpoint()
    
    if not root_success:
        print("❌ Root endpoint failed - API may be down")
        print(f"\n📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
        return 1
    
    # Test 2: Single chat message
    print("\n💬 Testing Chat Functionality...")
    chat_success, chat_response = tester.test_send_chat_message()
    
    if not chat_success:
        print("❌ Chat message failed - stopping further tests")
        print(f"\n📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
        return 1
    
    # Test 3: Chat history
    print("\n📜 Testing Chat History...")
    history_success, _ = tester.test_get_chat_history()
    
    # Test 4: Update inquiry
    print("\n📝 Testing Inquiry Update...")
    inquiry_success, _ = tester.test_update_inquiry()
    
    # Test 5: Multiple messages conversation
    print("\n🔄 Testing Multiple Messages...")
    multi_success = tester.test_multiple_messages()
    
    # Test 6: Final history check
    print("\n📜 Testing Final Chat History...")
    final_history_success, final_history = tester.test_get_chat_history()
    
    if final_history_success and isinstance(final_history, list):
        print(f"   💬 Total messages in history: {len(final_history)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())