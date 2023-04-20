import psutil
import time

def get_network_traffic():
    net_io_counters = psutil.net_io_counters()
    return net_io_counters.bytes_sent, net_io_counters.bytes_recv

def main():
    print("监控网络流量，按Ctrl+C退出程序")

    try:
        while True:
            sent_before, recv_before = get_network_traffic()
            time.sleep(1)
            sent_after, recv_after = get_network_traffic()

            sent_speed = (sent_after - sent_before) / 1024  # 转换为KB
            recv_speed = (recv_after - recv_before) / 1024  # 转换为KB

            print(f"上传速度: {sent_speed:.2f} KB/s | 下载速度: {recv_speed:.2f} KB/s")

    except KeyboardInterrupt:
        print("\n程序已退出。")
        input("按任意键退出...")

if __name__ == "__main__":
    main()
